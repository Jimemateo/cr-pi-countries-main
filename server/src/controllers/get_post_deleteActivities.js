const { Activity, Country } = require("../db");
const { getAllInfo } = require("./countryApi_Db");
const { Op } = require("sequelize");

// Controlador para obtener todas las actividades turísticas

const getActivities = async (req, res) => {
  const responseBd = await getAllInfo(); //para que se llene la bd en caso de estar vacía
  try {
    const { name } = req.query;
    const conditions = {
      ...(name ? { name: { [Op.iLike]: `%${name}%` } } : {}),
    };

    const response = await Activity.findAll({
      where: conditions,
      include: {
        model: Country,
        attributes: ["name"],
      },
    });

    if (response.length === 0) {
      return res.status(404).send({ msg: "That Activity does not exist. Maybe you can create a new one!" });
    }

    return res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ msg: "Error trying to get Activities" });
  }
};

//Post activity

const postActivity = async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;

  try {
    if (name && difficulty && duration && season && countries) {
      const countriesArr = [];
      for (const index in countries) {
        const countryCodeUpper = countries[index].toUpperCase();
        let country = await Country.findOne({
          where: { id: countryCodeUpper },
        });
        if (!country) {
          res
            .status(400)
            .send({ message: `Country ${countryCodeUpper} invalid` });
          return;
        }
        countriesArr.push(country);
      }

      let activity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
      });

      await activity.addCountries(countriesArr); // para relacionar la actividad con el country en la tabla intermedia
      const logActivity = await Activity.findOne({
        where: { id: activity.id },
        include: [
          {
            model: Country,
            attributes: [
              "id",
              "name",
              "flag",
              "continent",
              "capital",
              "subregion",
              "area",
              "population",
            ],
            through: {
              attributes: [],
            },
          },
        ],
      });
      res.status(200).json(logActivity);
    } else {
      res.status(400).send("Missing information, can't add activity");
    }
  } catch (error) {
    console.error(error); // Registrar el error para depuración
    res.status(500).send("Internal Server Error");
  }
};











const deleteActivity = async (req, res) => {
  const { id } = req.params;

  try {
    await Activity.destroy({ where: { id } });
    const allActivities = await Activity.findAll();

    res.status(200).json(allActivities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getActivities,
  postActivity,
  deleteActivity,
};
