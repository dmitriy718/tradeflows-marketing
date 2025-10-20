@echo off
echo ========================================
echo Starting TradeFlows Backend Server
echo ========================================
echo.

cd /d "%~dp0.."

echo Backend Directory: %CD%
echo.

echo Checking Node.js installation...
node --version
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js not found! Please install Node.js first.
    pause
    exit /b 1
)
echo.

echo Starting server...
echo Press Ctrl+C to stop
echo.

node server.js

pause