const { Country, Activity } = require("../db");
const { Router } = require("express");
const { Op } = require("sequelize");

const getCountry = async (req, res) => {
  try {
    const { name } = req.query;
    const conditions = {
      ...(name ? { name: { [Op.iLike]: `%${name}%` } } : {}),
    };

    const response = await Country.findAll({
      where: conditions,
      include: {
        model: Activity,
        attributes: ["name"],
      },
    });

    if (response.length === 0) {
      res.status(404).send({ msg: "Not Found" });
      return;
    }

    return res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ msg: "Error trying to get Countries" });
  }
};

module.exports = {
  getCountry,
};
