## Setup WiFi Credentials for your Arduino
- Add a file called WiFi_Login.cpp in this directory
- Go to WiFi_Login.cpp file and add the code below
- Change the WIFI_SSID string to your WIFI Name
- Change the WIFI_PASSWORD string to your WIFI Password
```
#include "WiFi_Login.h"

// This is the definition of your variable.  It can only happen in one place.
// You must include WiFi_Login.h so that the compiler matches it to the correct
// one, and doesn't implicitly convert it to static.
const char* WIFI_SSID = "YOUR_SSID";
const char* WIFI_PASSWORD = "YOUR_PASSWORD";
```
