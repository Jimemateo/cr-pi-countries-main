import styles from "./CountriesFilter.module.css";
import {
  orderCountries,
  getCountries,
  filterCountries,
} from "../../redux/actions.js";
import { connect } from "react-redux";
import { countriesFilterPropTypes } from "../propTypes.js";

//filtros
function CountriesOrderFilters({
  countriesOrder,
  orderCountries2,
  filterCountries2,
  activities,
  getAllCountries,
}) {
  // Funciones manejadoras para ordenar y filtrar países
  function handleName(event) {
    console.log("Event value:", event.target.value);
    console.log("Countries Order", countriesOrder);
    // Si se selecciona 'Name', cargar todos los países
    if (event.target.value === "Name") {
      return getAllCountries();
    }
    // Ordenar países por nombre (ascendente o descendente)
    orderCountries2(countriesOrder, { name: event.target.value });
  }

  function handlePupulation(event) {
    // Si se selecciona 'Population', cargar todos los países
    if (event.target.value === "Population") {
      return getAllCountries();
    }
    // Ordenar países por población (ascendente o descendente)
    orderCountries2(countriesOrder, { population: event.target.value });
  }

  function handleContinent(event) {
    // Si se selecciona 'Continent', cargar todos los países
    if (event.target.value === "Continent") {
      return getAllCountries();
    }
    // Ordenar países por continente (ascendente o descendente)
    orderCountries2(countriesOrder, { continent: event.target.value });
  }

  function handleFilterCountries(event) {
    // Si se selecciona 'continentFilter', cargar todos los países
    if (event.target.value === "continentFilter") {
      return getAllCountries();
    }
    // Filtrar países por continente
    filterCountries2(countriesOrder, { continent: event.target.value });
  }

  async function handleFilterActivities(event) {
    // Si se selecciona 'activityFilter', cargar todos los países
    if (event.target.value === "activityFilter") {
      return getAllCountries();
    }

    filterCountries2(countriesOrder, {activities: event.target.value})

    }

  return (
    <div className={styles.filters}>
      {/* Selección de opciones de orden y filtro */}
      <div>
        <select className={styles.select} onChange={handleName}>
          <option label="Order by Name" value="Name"></option>
          <option value="Ascendent">Ascendente</option>
          <option value="Descendent">Descendente</option>
        </select>
      </div>
      <div>
        <select className={styles.select} onChange={handlePupulation}>
          <option label="Order by Population" value="Population"></option>
          <option value="Ascendent">Ascendent</option>
          <option value="Descendent">Descendent</option>
        </select>
      </div>
      <div>
        <select className={styles.select} onChange={handleContinent}>
          <option label="Order by Continent" value="Continent"></option>
          <option value="Ascendent" label="Ascendent"></option>
          <option value="Descendent" label="Descendent"></option>
        </select>
      </div>
      <div>
        <select className={styles.select} onChange={handleFilterCountries}>
          <option label="Filter by Continent" value="continentFilter"></option>
          <option value="America" label="América"></option>
          <option value="Africa" label="Africa"></option>
          <option value="Asia" label="Asia"></option>
          <option value="Europe" label="Europa"></option>
          <option value="Oceania" label="Oceanía"></option>
          <option value="Antártida" label="Antártida"></option>
        </select>
      </div>
      <div>
        <select className={styles.select} onChange={handleFilterActivities}>
          <option
            key="-1"
            label="Filter by Tourist Activity"
            value="activityFilter"
          ></option>
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
    countriesOrder: state.countriesOrder,
    activities: state.activities,
  };
};
// Mapeo de las acciones de Redux a las props del componente
const mapDispatchToProps = (dispatch) => {
  // dispatch es una función proporcionada por Redux que se utiliza para enviar acciones a los reducers.
  return {
    orderCountries2: (orderTarget, criteria) =>
      dispatch(orderCountries(orderTarget, criteria)),
    getAllCountries: () => dispatch(getCountries()),
    filterCountries2: (countries, criteria) =>
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
