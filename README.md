# Proyecto CoruBus

Este proyecto contiene el backend y frontend de la aplicación CoruBus,
dockerizados para facilitar su despliegue y ejecución local.

---

## Tecnologías utilizadas

- **Angular 19 "StandAlone"**  
  Framework frontend para la construcción de la SPA (Single Page Application).

- **.NET 8 (ASP.NET Core)**  
  Backend para exponer la API REST y gestionar la lógica del servidor.

- **SQLite**  
  Base de datos ligera utilizada en la fase de desarrollo inicial y pruebas locales.

- **Docker & Docker Compose**  
  Herramientas de contenedorización para facilitar el despliegue local del proyecto.

- **NGINX**  
  Servidor web encargado de servir el frontend Angular y manejar el enrutamiento.

- **SCSS & Bootstrap**  
  Tecnologías para el diseño visual responsivo y la personalización de estilos.

- **Git & GitHub**  
  Sistema de control de versiones y repositorio para la colaboración y seguimiento del proyecto.

---

## Requisitos previos

- Tener instalado **Docker** y **Docker Compose** en el equipo.
- En Windows, ejecutar los scripts `.bat` con permisos adecuados.

---

## Cómo ejecutar el proyecto

1. Clona el repositorio en tu máquina local.

2. Ejecutar Docker-desktop en tu máquina.

3. Ejecuta (doble clic) en el archivo `start-proyect.bat` (Windows) o el script equivalente en Linux/macOS. "Actualmente solo se ejecuta automático en windows"
   Esto construirá las imágenes necesarias, levantará los contenedores y abrirá automáticamente el navegador en la aplicación.

---

## Acceso a la aplicación

El navegador se abrirá automáticamente en: http://localhost:30000, comprobar que este libre.

Si por alguna razón no se abre, puedes acceder manualmente en esta dirección.

---

## Cómo parar la aplicación

Para detener y eliminar los contenedores, ejecuta el archivo `stop-project.bat`. Este script se encargará de apagar los contenedores si están en ejecución y limpiar los recursos asociados.

---

## Nota importante sobre almacenamiento web

La aplicación utiliza Local Storage y Session Storage en el navegador para funcionar correctamente. Estas tecnologías están soportadas por la mayoría de los navegadores modernos, pero pueden estar limitadas o deshabilitadas en modos privados/incógnito o configuraciones muy estrictas de privacidad.

---

## Notas de interés

- La primera vez que ejecutes el proyecto puede tardar un poco más, ya que Docker descargará las imágenes base y construirá las imágenes propias.
- La base de datos está montada como volumen para preservar los datos entre ejecuciones.
- Si realizas cambios en el código, es recomendable reconstruir las imágenes usando el script de inicio, que incluye el paso de `docker-compose build`.

---

## Aviso legal

Esta aplicación utiliza datos provenientes de la api de itranvias.com . El proyecto se desarrolla con fines exclusivamente educativos y sin ánimo de lucro.
No se asume responsabilidad por el uso o manejo de dichos datos fuera del ámbito académico.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.[https://opensource.org/licenses/MIT].
