const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      validate: {
        len:[3,3]
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    area: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

  });
};