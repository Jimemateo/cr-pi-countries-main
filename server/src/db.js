require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`,
  {
    // Creamos una instancia de Sequelize para conectarnos a la base de datos 'countries'
    logging: false,
    native: false,
  }
);

const basename = path.basename(__filename); // Obtenemos el nombre base del archivo actual

const modelDefiners = []; // Creamos un array para almacenar las definiciones de modelos

fs.readdirSync(path.join(__dirname, "/models")) // Leemos los archivos en el directorio 'models'

  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    // Importamos y agregamos cada definición de modelo al array
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize)); // Ejecutamos cada función definida en el array de modelDefiners pasando la instancia sequelize

// Transformamos el nombre de los modelos a mayúsculas para estandarizar
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Obtenemos la referencia al modelo Country y Activity de sequelize
const { Country, Activity } = sequelize.models;

// Relaciones
Country.belongsToMany(Activity, { through: "CountryActivity" });
Activity.belongsToMany(Country, { through: "CountryActivity" });

// Exportamos los modelos y la instancia de sequelize
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importar la conexión { conn } = require('./db.js');
};
