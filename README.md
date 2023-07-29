<h1 align="center">Reseñas de Libros</h1>

<p align="center">
  <strong>Una aplicación para navegar, buscar y reseñar libros</strong>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-blue.svg">
</p>

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instrucciones para ejecutar la aplicación](#instrucciones-para-ejecutar-la-aplicación)
- [Funcionalidades](#funcionalidades)
- [Estructura del proyecto](#estructura-del-proyecto)

## Requisitos

Para ejecutar la aplicación de manera local, asegúrate de tener instalado lo siguiente:

- Node.js (versión 12 o superior)
- npm (Node Package Manager)

## Instrucciones para ejecutar la aplicación

1. Clonar el repositorio:
   git clone <URL-del-repositorio>

2. Configurar el backend:
   cd server
   npm install

Crea un archivo `.env` en el directorio `backend` y define las siguientes variables de entorno:
MONGODB_URI=
JWT_SECRET=

3. Iniciar el servidor (backend):
   npm start

4. Configurar el frontend:
   cd client
   npm install

5. Iniciar el servidor de desarrollo (frontend):

npm run dev

Una vez que hayas seguido estos pasos, la aplicación estará disponible en `http://localhost:3000/`.

## Funcionalidades

La aplicación de reseñas de libros permite a los usuarios:

- Registrarse e iniciar sesión con sus credenciales.
- Navegar por una lista de libros.
- Ver los detalles de un libro seleccionado.
- Dejar reseñas para un libro.
- Ver las reseñas dejadas por otros usuarios.

## Estructura del proyecto

El proyecto está organizado de la siguiente manera:

TechnicalTestBooks/
|-- backend/
| |-- src/
| | |-- controllers/
| | |-- models/
| | |-- routes/
| |-- .env
| |-- server.js
|-- frontend/
| |-- public/
| |-- src/
| | |-- components/
| | |-- pages/
| | |-- App.js
| | |-- index.js
|-- .gitignore
|-- package.json
|-- README.md

- `backend/`: Contiene el código del backend de la aplicación.
- `frontend/`: Contiene el código del frontend de la aplicación.
- `.env`: Archivo de configuración para variables de entorno del backend.
- `server.js`: Archivo principal del backend.
- `App.js`: Archivo principal del frontend.
