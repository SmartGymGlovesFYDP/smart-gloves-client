## Note:
- It is always a good idea to run ```npm install``` before running ```expo start``` or ```npm start``` since there may be dependencies other developers have added.

## To fix error "Setting a timer for a long period of time...":

1) Navigate to your node_modules/react-native/Libraries/Core/Timers/JSTimers.js file.

2) Look for the variable MAX_TIMER_DURATION_MS

3) Change its value to 10000 * 1000

4) Save the changes (with auto format turned off) and re-build your app.