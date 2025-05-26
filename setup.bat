@echo off
echo [0mInstalling node modules...
timeout /t 1 /nobreak > nul
CALL npm i
echo [92mInstalled![0m
timeout /t 1 /nobreak > nul
cd backend
echo Installing backend node modules...
timeout /t 1 /nobreak > nul
CALL npm i
echo [92mInstalled![0m
timeout /t 1 /nobreak > nul
cd ..
echo Run [93mnpm run dev[0m in this folder to launch the website locally. (Default port: [94m5173[0m)
timeout /t 1 /nobreak > nul
echo Run [93mnode index[0m in [94m./backend[0m to start the API server locally.
timeout /t 2 /nobreak > nul
echo Thank you for using TravelTracker [31m^<3[0m
timeout /t 1 /nobreak > nul
echo - The 5F Team