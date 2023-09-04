import PropTypes from "prop-types";

export const cardPropTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  continent: PropTypes.string.isRequired,
  population: PropTypes.number.isRequired,
  flag: PropTypes.string.isRequired,
};

export const cardsPropTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      continent: PropTypes.string.isRequired,
      capital: PropTypes.string.isRequired,
      area: PropTypes.number.isRequired,
      population: PropTypes.number.isRequired,
      flag: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export const searchPropTypes = {
  onSearch: PropTypes.func.isRequired,
};

export const activityPostPropTypes = {
  countries: PropTypes.array.isRequired,
  activityPost: PropTypes.func.isRequired,
  getAllCountries: PropTypes.func.isRequired,
};

export const countryDetailPropTypes = {
  match: PropTypes.object.isRequired,
  country: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    flag: PropTypes.string.isRequired,
    capital: PropTypes.string.isRequired,
    continent: PropTypes.string.isRequired,
    subregion: PropTypes.string.isRequired,
    area: PropTypes.number.isRequired,
    population: PropTypes.number.isRequired,
    activities: PropTypes.arrayOf(
      PropTypes.shape({
        // Define las PropTypes para las propiedades de cada actividad si es necesario
        // activityProp: PropTypes.tipo.isRequired,
      })
    ),
  }),
  getCountryId: PropTypes.func.isRequired,
};
export const homePropTypes = {
  countries: PropTypes.array.isRequired,
  getCountries: PropTypes.func.isRequired,
  getActivities: PropTypes.func.isRequired,
};
export const searchBarPropTypes = {
  getCountries: PropTypes.func, // Tipo de dato esperado para 'getCountries'
  cleanCountry: PropTypes.func, // Tipo de dato esperado para 'cleanCountry'
};
export const countryPropTypes = {
  country: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    flag: PropTypes.string,
    population: PropTypes.number,
    continent: PropTypes.string,
  }),
};
export const activityPropTypes = {
  activity: PropTypes.shape({
    name: PropTypes.string.isRequired, // Tipo de dato esperado para 'name' y requerido
    duration: PropTypes.number.isRequired, // Tipo de dato esperado para 'duration' y requerido
    season: PropTypes.string.isRequired, // Tipo de dato esperado para 'season' y requerido
    countries: PropTypes.arrayOf(PropTypes.string).isRequired, // Tipo de dato esperado para 'countries' como un array de strings y requerido
  }),
  getActivities: PropTypes.func.isRequired, // Tipo de dato esperado para 'getActivities' como una función y requerido
};

export const countriesFilterPropTypes = {
  countriesOrder: PropTypes.array.isRequired,
  orderCountries2: PropTypes.func.isRequired,
  filterCountries2: PropTypes.func.isRequired,
  activities: PropTypes.array.isRequired,
  getAllCountries: PropTypes.func.isRequired,
};

export const CountryNamePropTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  flag: PropTypes.string.isRequired,
  population: PropTypes.number.isRequired,
  continent: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  countryNameButtonClose: PropTypes.bool.isRequired,
};

export const ActivityNamePropTypes = {
  name: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
};
