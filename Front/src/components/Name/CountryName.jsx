import { Link } from "react-router-dom"; // Importa el componente Link de react-router-dom
import styles from "./Name.module.css";
import { CountryNamePropTypes } from "../propTypes";

export default function CountryName({
  name,
  id,
  flag,
  population,
  continent,
  onClose,
  countryNameButtonClose,
}) {
  // Define el componente funcional CountryName y recibe propiedades (props)
  return (
    <div>
      {countryNameButtonClose ? ( // Comprueba si countryNameButtonClose es verdadero para decidir si renderizar el contenido
        <div className={styles.countryName}>
          {/* Botón para cerrar el componente */}
          <button className={styles.closeBtn} onClick={onClose}>
            X
          </button>
          <Link to={`/detail/${id}`}>
            {" "}
            {/* Enlace a la página de detalles del país */}
            <img
              className={styles.countryNameimg}
              src={flag}
              alt={`Flag of ${name}`}
            />{" "}
            {/* Imagen de la bandera del país con un texto alternativo */}
          </Link>
          <div>
            <h1>{name}</h1> {/* Nombre del país */}
            <p>Continent: {continent}</p>
            <p>Population: {population}</p>
          </div>
        </div>
      ) : null}{" "}
      {/* Si countryNameButtonClose es falso, no se muestra el componente */}
    </div>
  );
}

CountryName.propTypes = CountryNamePropTypes;
