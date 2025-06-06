# Proyecto CoruBus

Este proyecto contiene el backend y frontend de la aplicación CoruBus, dockerizados para facilitar su despliegue y ejecución local.

---

## Requisitos previos

- Tener instalado **Docker** y **Docker Compose** en el equipo.
- En Windows, ejecutar los scripts `.bat` con permisos adecuados.

---

## Cómo ejecutar el proyecto

1. Clona el repositorio en tu máquina local.

2. Ejecuta el archivo `start-proyect.bat` (Windows) o el script equivalente en Linux/macOS. "Actualmente solo se ejecuta automático en windows"
   Esto construirá las imágenes necesarias, levantará los contenedores y abrirá automáticamente el navegador en la aplicación.

---

## Acceso a la aplicación

El navegador se abrirá automáticamente en: http://localhost:30000

Si por alguna razón no se abre, puedes acceder manualmente en esta dirección.

---

## Cómo parar la aplicación

Para detener y eliminar los contenedores, ejecuta el archivo `stop-project.bat`. Este script se encargará de apagar los contenedores si están en ejecución y limpiar los recursos asociados.

---

## Notas

- La primera vez que ejecutes el proyecto puede tardar un poco más, ya que Docker descargará las imágenes base y construirá las imágenes propias.
- La base de datos está montada como volumen para preservar los datos entre ejecuciones.
- Si realizas cambios en el código, es recomendable reconstruir las imágenes usando el script de inicio, que incluye el paso de `docker-compose build`.


