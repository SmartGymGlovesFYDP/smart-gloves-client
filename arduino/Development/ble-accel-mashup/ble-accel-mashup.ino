#include <ArduinoBLE.h>
#include <Arduino_LSM6DS3.h>
#include <ArduinoJson.h>

#define CHARACTERISTIC_LENGTH 77

// BLE IMU Service
// UUID: 2A5D -> "Sensor Location"
// To see assigned 16-bit UUIDs:
// https://www.bluetooth.com/specifications/assigned-numbers/
BLEService IMUService("2A5D");

// BLE Characteristics for accelerometer and gyroscope readings
// Remote clients will be able to get notifications if any characteristic changes
// Each characteristic has a standard 16-bit characteristic UUID
// Note: Maximum characteristic packet size is 512 bytes
// For more info on BLE services & characteristics:
// https://www.arduino.cc/en/Reference/ArduinoBLEBLECharacteristicBLECharacteristic
BLEStringCharacteristic accelChar("190313ee-5f69-489f-a812-b93eeb413329", BLERead | BLENotify, CHARACTERISTIC_LENGTH);
BLEStringCharacteristic gyroChar("ed131e76-3d4f-4fd9-b8f9-fba0bc580ee8", BLERead | BLENotify, CHARACTERISTIC_LENGTH);

// Variables for storing previous accelerometer readings
float ax_old = 0;
float ay_old = 0;
float az_old = 0;

// Variables for storing previous gyroscope readings
float gx_old = 0;
float gy_old = 0;
float gz_old = 0;

// Last time the IMU sensors were read, in ms
long previousMillis = 0;

void setup() {
  // Initialize serial communication
  Serial.begin(9600);
  while (!Serial);

  // Initialize the built-in LED pin to indicate when a central is connected
  pinMode(LED_BUILTIN, OUTPUT);
  
  // Begin initialization
  if (!BLE.begin()) {
    Serial.println("starting BLE failed!");
    while (1);
  }

  /* Set a local name for the BLE device
     This name will appear in advertising packets
     and can be used by remote devices to identify this BLE device
     The name can be changed but maybe be truncated based on space left in advertisement packet
  */
  BLE.setLocalName("IMUMonitor");
  BLE.setAdvertisedService(IMUService); // add the service UUID
  
  // Add all the characteristics for the service
  IMUService.addCharacteristic(accelChar);
  IMUService.addCharacteristic(gyroChar);
  
  BLE.addService(IMUService); // Add the IMU service
  
  // Set initial value for characteristics
  /*
  axChar.writeValue(ax_old);
  ayChar.writeValue(ay_old); 
  azChar.writeValue(az_old); 
  gxChar.writeValue(gx_old);
  gyChar.writeValue(gy_old); 
  gzChar.writeValue(gz_old); */

  /* Start advertising BLE.  It will start continuously transmitting BLE
     advertising packets and will be visible to remote BLE central devices
     until it receives a new connection */

  // Start advertising
  BLE.advertise();

  Serial.println("Bluetooth device active, waiting for connections...");
  Serial.println();

  // Start up the IMU
  if (!IMU.begin()) {
    Serial.println("Failed to initialize IMU!");
    while (1);
  }

  // DEBUG INFO: Sample rate
  // Accelerometer sample rate in Hz and G's
  Serial.print("Accelerometer sample rate = ");
  Serial.print(IMU.accelerationSampleRate());
  Serial.println(" Hz");
  Serial.println("Acceleration in G's");
  Serial.println("X\tY\tZ");
  Serial.println();
  
  // Gyroscope sample rate in Hz and degrees/s
  Serial.print("Gyroscope sample rate = ");
  Serial.print(IMU.gyroscopeSampleRate());
  Serial.println(" Hz");
  Serial.println("Gyroscope in degrees/second");
  Serial.println("X\tY\tZ");
  Serial.println();
}

void loop() {
  // wait for a BLE central
  BLEDevice central = BLE.central();

  // if a central is connected to the peripheral:
  if (central) {
    Serial.print("Connected to central: ");
    // print the central's BT address:
    Serial.println(central.address());
    // turn on the LED to indicate the connection:
    digitalWrite(LED_BUILTIN, HIGH);

    // check the battery level every 200ms
    // while the central is connected:
    while (central.connected()) {
      long currentMillis = millis();
      // if 200ms have passed, check the battery level:
      if (currentMillis - previousMillis >= 200) {
        previousMillis = currentMillis;
        updateIMUReadings();
      }
    }
    // when the central disconnects, turn off the LED:
    digitalWrite(LED_BUILTIN, LOW);
    Serial.print("Disconnected from central: ");
    Serial.println(central.address());
  }
}

void updateIMUReadings() {
  float ax, ay, az, gx, gy, gz;
      
  if (IMU.accelerationAvailable()) {
    IMU.readAcceleration(ax, ay, az);
    // DEBUG INFO: Transmit accelerometer readings to serial monitor for debugging purposes
//    Serial.print(ax);
//    Serial.print('\t');
//    Serial.print(ay);
//    Serial.print('\t');
//    Serial.println(az);
  }

  if(IMU.gyroscopeAvailable()) {
    IMU.readGyroscope(gx, gy, gz);
    // DEBUG INFO: Transmit gyroscope readings to serial monitor for debugging purposes
//    Serial.print(gx);
//    Serial.print('\t');
//    Serial.print(gy);
//    Serial.print('\t');
//    Serial.println(gz);
  }


/* Write to the BLE characteristic for the sensor if
 *  any of the readings have changed.
 *  
 *  Size of JSON is determined as follows:
      - timestamp -> string = 9 bytes
      - coordinates (x,y,z) -> float*3 = 48 bytes
      - Total = 73 bytes
 */
  unsigned long currentMillis = millis();
  unsigned long seconds = currentMillis / 1000;
  unsigned long minutes = seconds / 60;
  unsigned long hours = minutes / 60;
  currentMillis %= 1000;
  seconds %= 60;
  minutes %= 60;
  hours %= 24;

  String ms = currentMillis > 10? (currentMillis > 100? String(currentMillis) : "0" + String(currentMillis)) : "00" + String(currentMillis);
  String secs = seconds > 10? String(seconds) : "0" + String(seconds);
  String mins = minutes > 10? String(minutes) : "0" + String(minutes);
  String hrs = hours > 10? String(hours) : "0" + String(hours);
  String time_string = hrs + ':' + mins + ':' + secs + ':' + ms;
  
  if(ax != ax_old || ay != ay_old || az != az_old) {
    ax_old = ax;
    ay_old = ay;
    az_old = az;

    StaticJsonDocument<CHARACTERISTIC_LENGTH> doc;
    doc["x"] = ax;
    doc["y"] = ay;
    doc["z"] = az;
    doc["timestamp"] = time_string;

    char buf[CHARACTERISTIC_LENGTH];
    serializeJson(doc, buf, CHARACTERISTIC_LENGTH);
    accelChar.writeValue(buf);
  }
  if(gx != gx_old || gy != gy_old || gz != gz_old) {
    gx_old = gx;
    gy_old = gy;
    gz_old = gz;

    StaticJsonDocument<CHARACTERISTIC_LENGTH> doc;
    doc["x"] = gx;
    doc["y"] = gy;
    doc["z"] = gz;
    doc["timestamp"] = time_string;

    char buf[CHARACTERISTIC_LENGTH];
    serializeJson(doc, buf, CHARACTERISTIC_LENGTH);
    gyroChar.writeValue(buf);
  }
}
