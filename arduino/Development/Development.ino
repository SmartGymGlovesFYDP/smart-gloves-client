#include "Firebase_Arduino_WiFiNINA.h"
#include "Wifi_Login.h"
#include <Arduino_LSM6DS3.h>

#define FIREBASE_HOST "smartgloves-e450e-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "dGconvs4SP3IWXB7wohi9KliWVZnIRHp3IgJrrOY"

//Define Firebase data object
FirebaseData firebaseData;

void setup()
{

  Serial.begin(115200);
  delay(100);
  Serial.println();

  Serial.print("Connecting to Wi-Fi");
  int status = WL_IDLE_STATUS;
  while (status != WL_CONNECTED)
  {
    status = WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  //Provide the autntication data
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH, WIFI_SSID, WIFI_PASSWORD);
  Firebase.reconnectWiFi(true);

  Serial.println("-----------------------------------");
  Serial.println("----------Begin Sampling-----------");
  Serial.println("-----------------------------------");
  Serial.println();

  if (!IMU.begin()) {
    Serial.println("Failed to initialize IMU!");
    while (1);
  }

  for (uint8_t i = 0; i < 5; i++)
  {
    float x, y, z;
    String jsonStr;

    if (IMU.gyroscopeAvailable())
    {
      IMU.readGyroscope(x, y, z);

      Serial.print(x);
      Serial.print('\t');
      Serial.print(y);
      Serial.print('\t');
      Serial.println(z);
    }

    String fb_X = String(x);
    String fb_Y = String(y);
    String fb_Z = String(z);

    jsonStr = "{\"x\" :" + fb_X + ",\"y\" :" + fb_Y + ",\"z\" :" + fb_Z + "}";

    Firebase.pushJSON(firebaseData, "Gyroscope/Sample", jsonStr);

    // {"Data":2}

    // {"Sample": {"x":fb_X,"y":fb_Y,"z":fb_Z}}
    // {"x":fb_X,"y":fb_Y,"z":fb_Z}

    // Firebase.pushString(firebaseData, "Gyroscope/X", fb_X);
    // Firebase.pushString(firebaseData, "Gyroscope/Y", fb_Y);
    // Firebase.pushString(firebaseData, "Gyroscope/Z", fb_Z);

    delay(50);
  }
}


void loop()
{
}
