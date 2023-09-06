import { useEffect } from "react";
import { connect } from "react-redux";
import { getCountryDetail } from "../../redux/actions";
import styles from "./CountryDetail.module.css";
import { Link, useParams } from "react-router-dom";
import { countryDetailPropTypes } from "../propTypes.js";

function CountryDetail({ country, getCountryId }) {
  const { id } = useParams();

  // Utiliza 'useEffect' para cargar los detalles del país cuando el componente se monta.
  useEffect(() => {
    // Extrae el ID del país de los parámetros de la URL.
    getCountryId(id);
  }, [id]);

  return (
    <div className={styles.container}>
      {/* Enlace de regreso a la página de inicio */}
      <Link to={"/home"} className={styles.btnHome}>
        Home{" "}
      </Link>
      <div className={styles.countryCard}>
        <div className={styles.nameAndId}>
          <h2>{country.name} </h2>
          <h4>Country's Id: {country.id}</h4>
        </div>
        <div>
          <img
            className={styles.countryCardimg}
            src={country.flag}
            alt="Broken flag image"
          />
        </div>
        <div className={styles.info}>
          <p>Capital: {country.capital}</p>
          <p>Continent: {country.continent}</p>
          <p>Subcontinent: {country.subregion}</p>
          <p>Area: {country.area} km²</p>
          <p>Population: {country.population}</p>
          <p>
            Tourist Activities:{" "}
            {country.activities
              ? country.activities.map(
                  (activity) => "&laquo;" + activity.name + "&raquo; "
                )
              : null}
          </p>
        </div>
      </div>
    </div>
  );
}

// Función que mapea el estado de Redux a las props del componente.
const mapStateToProps = (state) => {
  return {
    country: state.country,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCountryId: (countryId) => dispatch(getCountryDetail(countryId)),
  };
};

// Define PropTypes para el componente.
CountryDetail.propTypes = countryDetailPropTypes;
// Conecta el componente a Redux y exporta la versión conectada.
export default connect(mapStateToProps, mapDispatchToProps)(CountryDetail);
