@echo off
echo ========================================
echo    INSTALADOR DE DEPENDENCIAS
echo    Proyecto ORT Mobile Backend
echo ========================================
echo.

echo Verificando que Node.js este instalado...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js no esta instalado o no esta en el PATH
    echo Por favor instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js encontrado:
node --version

echo.
echo Verificando que npm este disponible...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm no esta disponible
    pause
    exit /b 1
)

echo npm encontrado:
npm --version

echo.
echo Navegando a la carpeta Backend...
cd Backend
if %errorlevel% neq 0 (
    echo ERROR: No se pudo acceder a la carpeta Backend
    pause
    exit /b 1
)

echo.
echo Instalando dependencias...
echo Esto puede tomar unos minutos...
echo.

npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: La instalacion de dependencias fallo
    echo Revisa los mensajes de error anteriores
    pause
    exit /b 1
)

echo.
echo ========================================
echo    INSTALACION COMPLETADA
echo ========================================
echo.
echo Todas las dependencias han sido instaladas correctamente.
echo.
echo Para ejecutar el proyecto en modo desarrollo:
echo   npm run dev
echo.
echo Para ejecutar el proyecto en modo produccion:
echo   npm start
echo.
pause
