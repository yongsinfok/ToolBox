@echo off
title ToolBox Dev Server

echo ========================================
echo   ToolBox Development Server
echo ========================================
echo.
echo Starting server...
echo Server will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

REM Start npm run dev in background
start /B npm run dev

REM Wait a bit for server to start
timeout /t 3 /nobreak >nul

REM Open browser
start http://localhost:3000

REM Keep window open
echo Server is running. Press Ctrl+C to stop.
cmd /k npm run dev
