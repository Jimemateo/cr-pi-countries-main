import axios from "axios";
// Importa los tipos de acciones definidos en 'actions.types.js'
import {
  GET_COUNTRIES,
  GET_COUNTRY_DETAIL,
  GET_ACTIVITIES,
  ORDER_COUNTRIES,
  POST_ACTIVITY,
  FILTER_COUNTRIES,
  CLEAN_COUNTRY,
  CLEAN_ACTIVITY,
} from "./actions.types.js";
// Importa funciones de validación personalizadas
import {
  countriesOrder,
  filterContinentActivity,
} from "../utils/validations.js";

const URL = "http://localhost:3001";

// Acción para obtener todos los países o un país por nombre
export function getCountries(name = null) {
  return async (dispatch) => {
    try {
      let url = `${URL}/countries`;
      if (name) {
        url = `${URL}/countries?name=${name}`;
      }
      const { data } = await axios(url);
      dispatch({
        type: GET_COUNTRIES,
        payload: data,
        country: data[0], // El primer país si es una búsqueda por nombre
      });
    } catch (error) {
      window.alert(error.message);
    }
  };
}
// Acción para limpiar los datos de un país
export function cleanCountry() {
  return function (dispatch) {
    dispatch({
      type: CLEAN_COUNTRY, // Tipo de acción para limpiar el país
      payload: "",
    });
  };
}

// Acción para obtener los detalles de un país por ID
export function getCountryDetail(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL}/countries/${id}`); // Realiza una solicitud GET a la API con el ID del país
      return dispatch({
        type: GET_COUNTRY_DETAIL, // Tipo de acción para obtener detalles de un paí
        payload: data, // Datos de los detalles del país obtenidos de la API
      });
    } catch (error) {
      window.alert(error.message);
    }
  };
}

// Acción para obtener detalles de una actividad turística por nombre
export function getActivities(name = null) {
  return async (dispatch) => {
    try {
      let url = `${URL}/activity`;
      if (name) {
        url = `${URL}/activity?name=${name}`;
      }
      const { data } = await axios(url);

      dispatch({
        type: GET_ACTIVITIES,
        payload: data,
      });
    } catch (error) {
      window.alert(
        (error.message =
          "That activity does not exist. Maybe you can create a new one!")
      );
    }
  };
}
// Acción para crear una actividad turística
export function postActivity(activity) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}/activity`, activity);
      return dispatch({
        type: POST_ACTIVITY,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
// Acción para limpiar los datos de un país
export function cleanActivity() {
  return function (dispatch) {
    dispatch({
      type: CLEAN_ACTIVITY, // Tipo de acción para limpiar la actividad
      payload: "",
    });
  };
}

// Acción para ordenar países
export function orderCountries(orderTarget, criteria) {
  // return {
  //     type: ORDER_COUNTRIES,
  //     payload: countriesOrder(orderTarget, criteria),
  //   };
  // }
  return async (dispatch) => {
    countriesOrder(orderTarget, criteria).then((orderTarget) => {
      return dispatch({
        type: ORDER_COUNTRIES,
        payload: orderTarget,
      });
    });
  };
}

// Acción para filtrar países por continente o actividad turística
export function filterCountries(orderTarget, criteria) {
  return async (dispatch) => {
    filterContinentActivity(orderTarget, criteria).then((orderTarget) => {
      return dispatch({
        type: FILTER_COUNTRIES,
        payload: orderTarget,
      });
    });
  };
}
