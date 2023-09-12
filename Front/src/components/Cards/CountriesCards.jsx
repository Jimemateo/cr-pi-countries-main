import CountryCard from "../Card/CountryCard.jsx";
import { cardsPropTypes } from "../propTypes.js";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import styles from "./Cards.module.css";
import { Link } from "react-router-dom";

function CountriesCards({ countries }) {
  // Declara un estado para almacenar los países que se mostrarán en la página actual.
  const [actualStateCountries, setActualStateCountries] = useState([]);

  // Define una constante para el número de países por página.
  const countriesPorPage = 10;
  // Calcula el número de páginas necesarias según la cantidad de países y el límite de países por página.
  const pages = Math.ceil(countries.length / countriesPorPage);

  // Declara un estado para almacenar la página actual.
  const [currentPage, setCurrentPage] = useState(1);

  // Función para mostrar los países de una página específica.
  const showPages = (pageNum) => {
    const index = pageNum * countriesPorPage + 1;
    setActualStateCountries(
      countries.slice(index - countriesPorPage - 1, index - 1)
    );
    setCurrentPage(pageNum);
  };

  // Usa el efecto para mostrar la primera página de países cuando el arreglo 'countries' cambia.
  useEffect(() => {
    showPages(1);
  }, [countries]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.searchContainer}>
          {/* Botón para ir a la página anterior */}
          <button
            className={styles.btnIzq}
            onClick={() =>
              showPages(currentPage > 1 ? currentPage - 1 : currentPage)
            }
          >
            {"«"}
          </button>

          <div className={styles.pageNumber} >{`Page ${currentPage} of ${pages}`} </div>

          <div>
            {/* Enlace para crear una actividad turística */}
            <Link to={"/activity"}>
              <button className={styles.btnActivity}>
                Create Tourist Activity
              </button>
            </Link>
          </div>
          {/* Botón para ir a la página siguiente */}
          <button
            className={styles.btnDer}
            onClick={() =>
              showPages(currentPage < pages ? currentPage + 1 : currentPage)
            }
          >{`»`}</button>
        </div>

        <div className={styles.container}>
          {/* Mapea y muestra los países en 'actualStateCountries' utilizando el componente 'CountryCard' */}
          {actualStateCountries &&
            actualStateCountries.map((country) => (
              <CountryCard
                key={country.id}
                id={country.id}
                name={country.name}
                population={country.population}
                flag={country.flag}
                continent={country.continent}
              />
            ))}
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    countries: state.countries,
  };
};
CountriesCards.propTypes = cardsPropTypes;
export default connect(mapStateToProps, null)(CountriesCards);

