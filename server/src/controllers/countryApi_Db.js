const axios = require("axios");
const { Country } = require("../db");

const getAllInfo = async () => {
  console.log("Fetching data from API and loading into the database...");
  try {
    const dataInDB = await Country.count(); // para ver si está cargada la base de datos, si está vacía se consume la API y completa el modelo.

    if (!dataInDB) {
      const apiResponse = await axios.get("http://localhost:5000/countries");

      const allApiCountries = apiResponse.data.map((api) => {
        return {
          id: api.cca3,
          name: api.name.common,
          flag: api.flags.png,
          continent: api.continents[0],
          capital: api.capital ? api.capital[0] : "capital not found",
          subregion: api.subregion ? "Antartic" : api.subregion,
          area: api.area,
          population: api.population,
        };
      });

      for (const countryData of allApiCountries) {
        try {
          await Country.create(countryData);
        } catch (error) {}
      }
    }
  } catch (err) {
    console.error("Error fetching or processing data:", err.message); // Log error fetching or processing data
    return err;
  }
};

module.exports = {
  getAllInfo,
};
