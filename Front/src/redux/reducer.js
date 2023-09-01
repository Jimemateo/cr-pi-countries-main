import { GET_COUNTRIES, GET_COUNTRY_DETAIL, GET_ACTIVITIES, ORDER_COUNTRIES, POST_ACTIVITY, FILTER_COUNTRIES, CLEAN_COUNTRY } from "./actions.types.js";
const initialState = {
    countries: [],
    country: [],
    activity: {},
    formActivity:{},
    countriesOrder: [],
    activities:[]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload, // Actualiza la lista de países con los datos obtenidos
                countriesOrder: action.payload, // Actualiza la lista de países ordenados con los datos obtenidos
                country: action.country, // Establece los detalles del país con los datos obtenidos por nombre
            };
        case CLEAN_COUNTRY:
            return {
                ...state,
                country: action.payload, // Limpia los detalles del país
            };
        case GET_COUNTRY_DETAIL:
            return {
                ...state,
                country: action.payload, // Establece los detalles del país con los datos obtenidos por ID
            };
            case GET_ACTIVITIES:
                return {
                  ...state,
                  activities: action.payload,
                };
        case ORDER_COUNTRIES:
            return {
                ...state,
                countries: action.payload.slice(),  // Actualiza la lista de países con la lista ordenada (se crea una copia)
            };
            case FILTER_COUNTRIES:
            return {
                ...state,
                countries: action.payload, // Actualiza la lista de países con la lista filtrada
                
            };
        case POST_ACTIVITY:
            return {
                ...state,
                formActivity: action.payload, // Establece los detalles de la actividad turística creada con los datos obtenidos
                activities: state.activities.concat(action.payload), // Agrega la nueva actividad turística a la lista de actividades existentes
            };
        default:
            return {
                ...state
            };
    }
};


export default reducer;