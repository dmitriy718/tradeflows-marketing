@echo off
REM Schedule Daily Blog Post Generation at 8 AM EST
REM This script sets up a Windows Task Scheduler task

echo ========================================
echo TradeFlows Blog Post Scheduler Setup
echo ========================================
echo.

REM Get the current directory
set SCRIPT_DIR=%~dp0
set PROJECT_DIR=%SCRIPT_DIR%..
set NODE_SCRIPT=%SCRIPT_DIR%generateBlogPost.js

echo Project Directory: %PROJECT_DIR%
echo Node Script: %NODE_SCRIPT%
echo.

REM Create the scheduled task
echo Creating scheduled task...
schtasks /Create /SC DAILY /TN "TradeFlows_Daily_Blog_Post" /TR "cmd /c cd /d %PROJECT_DIR% && node %NODE_SCRIPT% >> logs\blog-generation.log 2>&1" /ST 08:00 /F /RU "%USERNAME%"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ SUCCESS! Blog post task scheduled successfully!
    echo.
    echo Task Details:
    echo - Name: TradeFlows_Daily_Blog_Post
    echo - Schedule: Daily at 8:00 AM
    echo - Script: %NODE_SCRIPT%
    echo - Logs: %PROJECT_DIR%\logs\blog-generation.log
    echo.
    echo To verify: schtasks /Query /TN "TradeFlows_Daily_Blog_Post"
    echo To run now: schtasks /Run /TN "TradeFlows_Daily_Blog_Post"
    echo To delete: schtasks /Delete /TN "TradeFlows_Daily_Blog_Post" /F
) else (
    echo.
    echo ❌ ERROR: Failed to create scheduled task.
    echo Please run this script as Administrator.
)

echo.
echo Creating logs directory...
if not exist "%PROJECT_DIR%\logs" mkdir "%PROJECT_DIR%\logs"
echo ✅ Logs directory created: %PROJECT_DIR%\logs
echo.

pause
