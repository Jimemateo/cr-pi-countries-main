import { useState } from "react";
import { getCountries, cleanCountry } from "../../redux/actions.js"; // Importa las acciones getCountries y cleanCountry desde el archivo de acciones
import { connect } from "react-redux";
import styles from "./SearchBar.module.css";
import { searchBarPropTypes } from "../propTypes";

function SearchBar({ getCountries, cleanCountry }) {
  const [formActualState, setFormActualState] = useState(""); // Define un estado para el valor del formulario de búsqueda
  const [hasSearched, setHasSearched] = useState(false); // Nuevo estado

  function handleButtonClick() {
    if (!formActualState) {
      return alert("You must enter the name of a country"); // Comprueba si se ha ingresado un nombre de país antes de realizar la búsqueda
    }
    setHasSearched(true); // Indicar que se ha realizado una búsqueda
  }

  // Función para manejar cambios en el campo de entrada.
  function handleChange(event) {
    setFormActualState(event.target.value); // Actualiza el estado con el valor del campo de búsqueda a medida que se escribe
  }

  function handleSubmit(event) {
    getCountries(formActualState); // Realiza una búsqueda de país por nombre usando la acción getCountries
    event.preventDefault(); // Evita que la pagina se refresque
    setFormActualState(""); // Restablece el valor del campo de búsqueda
    cleanCountry(); // Limpia el país en el estado Redux
  }

  function handleReset() {
    setHasSearched(false); // Volver al estado inicial
    cleanCountry(); // Limpia el país en el estado Redux
    getCountries();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.searchCountry}
          type="text"
          placeholder="Search for a Country"
          value={formActualState}
          onChange={handleChange}
        ></input>
        <button
          className={styles.btn}
          onClick={() => handleButtonClick()}
          type="submit"
        >
          🔍
        </button>
      </form>
      {/* Mostrar el botón de reset si se ha realizado una búsqueda */}
      {hasSearched && (
        <button className={styles.resetBtn} onClick={handleReset}>
          Show All Cards
        </button>
      )}
    </div>
  );
}

const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCountries: (name) => {
      dispatch(getCountries(name)); // Mapea la acción getCountries a las props
    },
    cleanCountry: () => dispatch(cleanCountry()),
  };
};
// Define los PropTypes para este componente
SearchBar.propTypes = searchBarPropTypes;
// Conecta el componente a Redux y exporta la versión conectada
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
