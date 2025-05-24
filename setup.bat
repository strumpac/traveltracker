@echo off
echo Installing node modules...
CALL npm i
cd backend
CALL npm i
cd ..
echo Run npm run dev in this folder, and node index in the backend folder, to run the program.