Make sure the following libraries are installed:
-  ArduinJson (by Benoit Blanchon)  - v 6.17.3 (for JSON serialization)
-  ArduinoBLE - v 1.2.0 (for BLE)
-  Arduino_LSM6DS3 - v 1.0.0 (for gyroscope and accelerometer)

Current Service Architecture:
1. Accelerometer Characteristic
2. Gyroscope Characteristic 
- Both packets contain x, y, z, & timestamp (hh:mm:ss:msms)

