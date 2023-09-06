// Importación de las librerías necesarias
const express = require("express"); // Importa el marco de aplicación web Express.js
const cookieParser = require("cookie-parser"); // Importa el analizador de cookies
const bodyParser = require("body-parser"); // Importa el analizador de datos del cuerpo de las solicitudes HTTP
const morgan = require("morgan"); // Importa el registrador de solicitudes HTTP
const routes = require("./routes/index.js"); // Importa el archivo de rutas personalizadas

// Configuración de la conexión a la base de datos
require("./db.js"); // Importa y ejecuta la configuración de la base de datos

// Creación de una instancia de Express
const server = express(); // Crea una instancia de la aplicación Express
server.name = "API"; // Asigna un nombre a la aplicación Express

// Configuración de middleware
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" })); // Configura el analizador de datos de formulario
server.use(bodyParser.json({ limit: "50mb" })); // Configura el analizador de datos JSON
server.use(cookieParser()); // Configura el analizador de cookies
server.use(morgan("dev")); // Configura el registrador de solicitudes HTTP en modo "dev"
server.use((req, res, next) => {
  // Configuración de encabezados para permitir el acceso desde diferentes orígenes
  res.header("Access-Control-Allow-Origin", "*"); // Permite el acceso desde cualquier origen
  res.header("Access-Control-Allow-Credentials", "true"); // Permite el envío de cookies de autenticación
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); // Define los encabezados permitidos
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); // Define los métodos HTTP permitidos
  next(); // Continúa con la siguiente función de middleware
});

// Configuración de las rutas de la aplicación
server.use("/", routes); // Monta el enrutador de rutas en la ruta raíz ("/")

// Manejo de errores
server.use((err, req, res, next) => {
  const status = err.status || 500; // Obtiene el estado del error o establece 500 (Error del servidor interno) por defecto
  const message = err.message || err; // Obtiene el mensaje de error o el propio error
  console.error(err); // Imprime el error en la consola
  res.status(status).send(message); // Envía una respuesta con el estado y el mensaje del error
});

// Exportar la instancia de la aplicación Express configurada
module.exports = server; // Exporta la instancia de la aplicación Express para su uso en otros archivos
