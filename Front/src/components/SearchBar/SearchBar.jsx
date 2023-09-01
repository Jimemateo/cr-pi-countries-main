import { useState } from "react";
import { getCountries, cleanCountry } from "../../redux/actions.js"; // Importa las acciones getCountries y cleanCountry desde el archivo de acciones
import { connect } from "react-redux";
import styles from "./SearchBar.module.css";
import CountryName from "../Name/CountryName.jsx";
import { searchBarPropTypes } from "../propTypes";

function SearchBar({ country, getCountries, cleanCountry }) {
  const [formActualState, setFormActualState] = useState(""); // Define un estado para el valor del formulario de búsqueda
  const [buttonClicked, setButtonClicked] = useState(false); // Define un estado para controlar si se hizo clic en el botón de búsqueda
  const [countryNameButtonClose, setCountryNameButtonClose] = useState(true); // Define un estado para controlar si mostrar el componente CountryName

  function handleCountryNameButtonClose() {
    setCountryNameButtonClose(false); // Función para cerrar el componente CountryName
  }

  function handleButtonClick() {
    if (!formActualState) {
      return alert("You must enter the name of a country"); // Comprueba si se ha ingresado un nombre de país antes de realizar la búsqueda
    }
    setButtonClicked(true); // Establece que se ha hecho clic en el botón de búsqueda
    setCountryNameButtonClose(true); // Muestra el componente CountryName
  }

  function handleChange(event) {
    setFormActualState(event.target.value); // Actualiza el estado con el valor del campo de búsqueda a medida que se escribe
  }

  function handleSubmit(event) {
    getCountries(formActualState); // Realiza una búsqueda de país por nombre usando la acción getCountries
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario
    setFormActualState(""); // Restablece el valor del campo de búsqueda
    cleanCountry(); // Limpia el país en el estado Redux
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
        {buttonClicked && country.name ? (
          <CountryName
            name={country.name}
            id={country.id}
            flag={country.flag}
            population={country.population}
            continent={country.continent}
            onClose={handleCountryNameButtonClose}
            countryNameButtonClose={countryNameButtonClose}
          />
        ) : null}
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // Mapea el estado del país desde Redux a las props
    country: state.country,
  };
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
