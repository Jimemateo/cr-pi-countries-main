import { useEffect, useState } from "react"; // Importa useEffect de React para realizar efectos secundarios
import { connect } from "react-redux";
import { getCountries, getActivities, filterCountries, orderCountries } from "../../../redux/actions.js";
import CountriesCards from "../../Cards/CountriesCards.jsx";
import styles from "./HomePage.module.css";
import Nav from "../../NavBar/Nav.jsx";
import { homePropTypes } from "../../propTypes.js";

function Home({
  allCountries, //copia de getCountries
  countries,
  getCountries,
  getActivities,
  hasSearched,
  hasSearchedAct,
  orderCountries,
  filterCountries,
  filters,
  order,
}) {
  // Destructura las props countries, getCountries y getActivities del objeto props
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Este efecto se ejecuta cuando el componente se monta
    const fetchCountriesData = async () => {
      await getCountries();
    } // se hace el getCountries en una funcion async para que devuelva una promesa y poder hacer el .then()

    fetchCountriesData().then(() =>{
      // una vez que la promesa devuelve OK, se traen las activities y se pone el false el isLoading, que va a permitir que no se apliquen los filtros ANTES que se carguen los paises
      getActivities(); // Llama a la acción getActivities para obtener la lista de actividades
      setIsLoading(false);
      // una vez cargados los paises, se filtra y se ordena en el montado del componente
      filterCountries(allCountries, {
        activities: filters.activity,
        continent: filters.continent,
      });
      orderCountries(countries, {
        name: order.name,
        continent: order.continent,
        population: order.population,
      });
    });
    return () => {
      setIsLoading(true);
    }
  }, []);

  useEffect(() => {
    if (isLoading) { return } // si no se cargaron los paises no se filtra
    // se filtra sobre todos los paises cuando cambia el state filters
    filterCountries(allCountries, {
      activities: filters.activity,
      continent: filters.continent,
    });
  }, [filters]);

  useEffect(() => {
    if (isLoading) { return } // si no se cargaron los paises no se ordena
    // se ordena sobre los paises filtrados cuando cambia el state order
    orderCountries(countries, {
      name: order.name,
      continent: order.continent,
      population: order.population,
    });
  }, [order]);

  return (
    <div className={styles.container}>
      {/* Renderiza el componente Nav para la barra de navegación */}
      <Nav />
      <div>
        {/* Renderiza el componente CountriesCards y pasa la lista de países como prop */}
        {/* Renderiza el componente de cartas de países solo si no se ha realizado una búsqueda */}
        {(!hasSearched || !hasSearchedAct) && (
          <CountriesCards countries={countries} />
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  // Define una función mapStateToProps que mapea el estado de Redux a las props del componente

  return {
    // Mapea la lista de países desde el estado de Redux a la prop countries
    allCountries: state.allCountries,
    countries: state.countries,
    hasSearched: state.hasSearched, // Agrega el estado de hasSearched desde Redux
    hasSearchedAct: state.hasSearchedAct, // Agrega el estado a hasSearchedAct desde Redux
    order: state.order,
    filters: state.filters,
  };
};

const mapDispatchToProps = (dispatch) => {
  // Define una función mapDispatchToProps que mapea las acciones a las props del componente
  return {
    getCountries: () => dispatch(getCountries()), // Mapea la acción getCountries a la prop getCountries
    getActivities: () => dispatch(getActivities()), // Mapea la acción getActivities a la prop getActivities
    orderCountries: (orderTarget, criteria) => dispatch(orderCountries(orderTarget, criteria)),
    filterCountries: (countries, criteria) => dispatch(filterCountries(countries, criteria)),
  };
};

Home.propTypes = homePropTypes; // Define los PropTypes para este componente
// Conecta el componente a Redux y exporta la versión conectada
export default connect(mapStateToProps, mapDispatchToProps)(Home);