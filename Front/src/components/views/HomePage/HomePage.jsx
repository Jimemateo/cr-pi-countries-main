import { useEffect } from "react"; // Importa useEffect de React para realizar efectos secundarios
import { connect } from "react-redux"; 
import { getCountries, getActivities } from "../../../redux/actions.js"; 
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
}) {
  // Destructura las props countries, getCountries y getActivities del objeto props

  useEffect(() => {
    // Este efecto se ejecuta cuando el componente se monta
    if (allCountries.length <= 0) { //si allCountries está vacia, llama a getCountries
      getCountries(); // Llama a la acción getCountries para obtener la lista de países
    }
    getActivities(); // Llama a la acción getActivities para obtener la lista de actividades
  }, []);

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
  };
};

const mapDispatchToProps = (dispatch) => {
  // Define una función mapDispatchToProps que mapea las acciones a las props del componente
  return {
    getCountries: () => dispatch(getCountries()), // Mapea la acción getCountries a la prop getCountries
    getActivities: () => dispatch(getActivities()), // Mapea la acción getActivities a la prop getActivities
  };
};

Home.propTypes = homePropTypes; // Define los PropTypes para este componente
// Conecta el componente a Redux y exporta la versión conectada
export default connect(mapStateToProps, mapDispatchToProps)(Home);
