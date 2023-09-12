import styles from "./CountriesFilter.module.css";
import {
  orderCountries,
  filterCountries,
  applyFilters,
  applyOrdering,
} from "../../redux/actions.js";
import { connect } from "react-redux";
import { countriesFilterPropTypes } from "../propTypes.js";
import { useEffect } from "react";

//filtros
function CountriesOrderFilters({
  countries,
  orderCountries,
  filterCountries,
  activities,
  applyFilters,
  allCountries,
  filters,
  applyOrdering,
  order,
}) {
  // Funciones manejadoras para ordenar y filtrar países
  function handleName(event) {
    applyOrdering({
      name: event.target.value,
    });
  }

  function handlePupulation(event) {
    applyOrdering({
      population: event.target.value,
    });
  }

  function handleContinent(event) {
    applyOrdering({
      continent: event.target.value,
    });
  }

  function handleFilterCountries(event) {
    applyFilters({
      continent: event.target.value,
    });
  }

  async function handleFilterActivities(event) {
    applyFilters({
      activity: event.target.value,
    });
  }

  useEffect(() => {
    // se filtra sobre todos los paises cuando cambia el state filters
    filterCountries(allCountries, {
      activities: filters.activity,
      continent: filters.continent,
    });
  }, [filters]);

  useEffect(() => {
    // se ordena sobre los paises filtrados cuando cambia el state order
    orderCountries(countries, {
      name: order.name,
      continent: order.continent,
      population: order.population,
    });
  }, [order]);

  useEffect(() => {
    //Se duplica porque sino no hace cambio de estado y no se disparan los filtrados
    filterCountries(allCountries, {
      activities: filters.activity,
      continent: filters.continent,
    });
    orderCountries(countries, {
      name: order.name,
      continent: order.continent,
      population: order.population,
    });

    return () => {};
  }, []);

  const nameOrderingOptions = [
    { value: "", label: "Order by Name" },
    { value: "Ascendent", label: "Ascendent" },
    { value: "Descendent", label: "Descendent" },
  ];

  const continentOrderingOptions = [
    { value: "", label: "Order by Continent" },
    { value: "Ascendent", label: "Ascendent" },
    { value: "Descendent", label: "Descendent" },
  ];

  const populationOrderingOptions = [
    { value: "", label: "Order by Population" },
    { value: "Ascendent", label: "Ascendent" },
    { value: "Descendent", label: "Descendent" },
  ];

  const continentFilterOptions = [
    { value: "", label: "Filter by Continent" },
    { value: "America", label: "America" },
    { value: "Africa", label: "Africa" },
    { value: "Asia", label: "Asia" },
    { value: "Europe", label: "Europe" },
    { value: "Oceania", label: "Oceania" },
    { value: "Antártida", label: "Antártida" },
  ];

  return (
    <div className={styles.filters}>
      {/* Selección de opciones de orden y filtro */}
      <div>
        <select
          className={styles.select}
          onChange={handleName}
          value={order.name}
        >
          {nameOrderingOptions.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <select
          className={styles.select}
          onChange={handlePupulation}
          value={order.population}
        >
          {populationOrderingOptions.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <select
          className={styles.select}
          onChange={handleContinent}
          value={order.continent}
        >
          {continentOrderingOptions.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <select
          className={styles.select}
          onChange={handleFilterCountries}
          value={filters.continent}
        >
          {continentFilterOptions.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <select
          className={styles.select}
          onChange={handleFilterActivities}
          value={filters.activity}
        >
          <option key="-1" label="Filter by Tourist Activity" value=""></option>
          {/* Mapeo de opciones de actividad turística */}
          {activities.length
            ? activities.map((activity, i) => (
                <option
                  key={i}
                  value={activity.name}
                  label={activity.name}
                ></option>
              ))
            : null}
        </select>
      </div>
    </div>
  );
}

// Mapeo del estado de Redux a las props del componente
const mapStateToProps = (state) => {
  return {
    allCountries: state.allCountries,
    order: state.order,
    filters: state.filters,
    countries: state.countries,
    activities: state.activities,
  };
};
// Mapeo de las acciones de Redux a las props del componente
const mapDispatchToProps = (dispatch) => {
  // dispatch es una función proporcionada por Redux que se utiliza para enviar acciones a los reducers.
  return {
    applyFilters: (filters) => dispatch(applyFilters(filters)),
    applyOrdering: (order) => dispatch(applyOrdering(order)),
    orderCountries: (orderTarget, criteria) =>
      dispatch(orderCountries(orderTarget, criteria)),
    filterCountries: (countries, criteria) =>
      dispatch(filterCountries(countries, criteria)),
  };
};
/*orderCountries2: Es una función que toma dos argumentos: orderTarget y criteria.
 Cuando se llama desde el componente, dispara la acción orderCountries con los argumentos proporcionados. 
Esta acción se utiliza para ordenar la lista de países en la aplicación según ciertos criterios 
(por ejemplo, nombre ascendente o descendente).

getAllCountries: Es una función que no toma argumentos. Cuando se llama desde el componente, dispara la acción 
getCountries. Esta acción se utiliza para obtener la lista completa de países.

filterCountries2: Es una función que toma dos argumentos: countries y criteria. Cuando se llama desde el componente, 
dispara la acción filterCountries con los argumentos proporcionados. Esta acción se utiliza para filtrar la lista de 
países según ciertos criterios (por ejemplo, por continente o actividad turística). */

CountriesOrderFilters.propTypes = countriesFilterPropTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountriesOrderFilters);
