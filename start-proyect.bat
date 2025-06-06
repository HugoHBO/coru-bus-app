@echo off
echo Parando y eliminando contenedores...
docker-compose down --volumes --remove-orphans

echo Construyyendo las imágenes sin cache...
docker-compose build --no-cache

echo Arrancando los contenedores en modo detached...
docker-compose up -d

echo Abriendo navegador en http://localhost:30000
start http://localhost:30000
pause
