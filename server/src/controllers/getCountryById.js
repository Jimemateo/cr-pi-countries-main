const { Country, Activity } = require("../db");
const { Router } = require("express");

const { Op } = require("sequelize");
const router = Router();

const getCountryById = async (req, res) => {
  const { id } = req.params; // Obtiene el parámetro de ruta 'id' de la solicitud

  try {
    const idResponse = await Country.findOne({
      where: { id: id }, // Utiliza el ID en la consulta sin modificar
      include: Activity,
    });

    if (!idResponse) {
      res.status(404).send({ msg: "Id country not found" });
    } else {
      res.status(200).send(idResponse); // Devuelve la información del país con el ID proporcionado
    }
  } catch (err) {
    res.status(500).send({ msg: "Error getting data" });
  }
};

module.exports = {
  getCountryById,
};
