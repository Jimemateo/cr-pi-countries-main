const { Activity, Country } = require("../db");
const { getAllInfo } = require("./countryApi_Db");
const { Op } = require("sequelize");

// Controlador para obtener todas las actividades turísticas

const getActivity = async (req, res) => {
  const { name } = req.query;

  const response = await getAllInfo(); //para que se llene la bd en caso de estar vacía

  if (name) {
    const selectActivity = await Activity.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: Country,
    });

    res.status(200).send(selectActivity);
  } else {
    const allActivities = await Activity.findAll({ include: Country });

    res.status(200).send(allActivities);
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
        let country = await Country.findOne({ where: { id: countryCodeUpper } });
        if (!country) {
          res.status(400).send({ message: `Country ${countryCodeUpper} invalid` });
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

      res
        .status(200)
        .send({ message: "The activity was created successfully" });
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
  getActivity,
  postActivity,
  deleteActivity,
};
