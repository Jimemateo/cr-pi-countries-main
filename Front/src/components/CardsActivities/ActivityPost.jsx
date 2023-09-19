// Importa 'connect' de 'react-redux' para conectar el componente a Redux y acciones.
import { connect } from "react-redux";
// Importa las acciones específicas que se utilizarán.
import {
  getCountries,
  postActivity,
  getActivities,
} from "../../redux/actions.js";
// Importa 'useState' y 'useEffect' de React para gestionar el estado y efectos secundarios.
import { useState, useEffect } from "react";
// Importa la función 'validate' para realizar validaciones.
import { validate } from "../../utils/validations.js";
import styles from "./Activity.module.css";
// Importa 'Link' de 'react-router-dom' para crear enlaces internos en la aplicación.
import { Link } from "react-router-dom";
import { activityPostPropTypes } from "../propTypes.js";

function ActivityPost({ countries, activityPost, getAllCountries }) {
  // Define el estado inicial del formulario.
  const [input, setInput] = useState({
    name: "",
    difficulty: "", // 1 a 5
    duration: "",
    season: "", //otoño, invierno, primavera, verano
    countries: [],
  });

  // Define el estado para gestionar los errores de validación.
  const [errors, setErrors] = useState({
    name: "",
    duration: "",
    countries: "",
  });

  // Utiliza 'useEffect' para cargar la lista de países al montar el componente.
  useEffect(() => {
    if (countries.length <= 0) {
      getAllCountries();
    }
  }, []);

  //mis handlers
  /*
handleCountriesSelection es un manejador de 
eventos para la selección de países. Añade o quita
 países en el estado input según las selecciones del usuario.
*/

  // Manejador de cambios en los campos del formulario.
  function handleInputChange(event) {
    // Realiza validación y actualiza el estado en función de los cambios del usuario.
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );

    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }

  /*
   handleCountriesSelection es un manejador de
   eventos para la selección de países. Añade o quita países en el 
   estado input según las selecciones del usuario.
   */

  // Manejador de selección de países.
  function handleCountriesSelection(event) {
    if (event.target.value === "") {
      setErrors({
        ...errors,
        countries: "You must choose a Country",
      });
      return;
    }
    setErrors({
      ...errors,
      countries: "",
    });
    const countryExists = input.countries.find(
      (item) => item === event.target.innerText
    );

    if (!countryExists) {
      setInput({
        ...input,
        countries: [...input.countries, event.target.value],
      });
    }
  }
  /*
handleSubmit se llama cuando se envía el formulario. Evita la presentación si 
hay errores, muestra un mensaje de éxito después de crear una actividad con 
éxito y redirige al usuario a la página de inicio.
También maneja errores si la creación de la actividad falla.
*/
  function handleSubmit(event) {
    event.preventDefault();
    // Realiza la acción de 'postActivity' para crear una actividad
    activityPost(input);
    setInput({
      name: "",
      difficulty: "", // 1 a 5
      duration: "",
      season: "", //otoño, invierno, primavera, verano
      countries: [],
    });
  }
  // Manejador para mostrar un mensaje de éxito o error al hacer clic en el botón de envío.
  function onCLickSubmit() {
    if (
      !input.name ||
      !input.difficulty ||
      !input.duration ||
      !input.countries ||
      !input.season
    ) {
      alert("You must complete all the fields!");
    } else {
      alert("Activity created successfully!");
    }
  }

  // Renderiza el formulario.
  return (
    <div>
      <div className={styles.container}>
        {/* Enlace de regreso a la página de inicio */}
        <Link to={"/home"} className={styles.btnHome}>
          Home
        </Link>

        <Link to={"/activities-search"} className={styles.backButton}>
          Back to Activities
        </Link>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.elements}>
            {/* Campo de entrada para el nombre de la actividad */}
            <input
              className={styles.select}
              name="name"
              type="text"
              value={input.name}
              onChange={handleInputChange}
              placeholder="Activity"
            />
            {errors.name && (
              <p className={styles.errorMessage}>{errors.name}</p>
            )}
          </div>
          <div></div>
          <div>
            {/* Selector para la temporada de la actividad */}
            <select
              className={styles.selectSeason}
              onChange={handleInputChange}
              name="season"
            >
              <option value={input.season}>{"Choose Season"}</option>
              <option value="Summer">Summer</option>
              <option value="Autumn">Autumn</option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
            </select>
          </div>

          <div></div>
          <div>
            {/* Selector para la dificultad de la actividad */}
            <select
              className={styles.selectDifficulty}
              onChange={handleInputChange}
              name="difficulty"
            >
              <option value={input.difficulty}>{"Choose Difficulty"}</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div></div>
          <div>
            {/* Campo de entrada para la duración de la actividad */}
            <input
              className={styles.select}
              name="duration"
              type="number"
              value={input.duration}
              onChange={handleInputChange}
              placeholder="Duration in Hours"
            />
            {errors.duration && (
              <p className={styles.errorMessage}>{errors.duration}</p>
            )}
          </div>

          <select
            className={styles.selectCountry}
            onChange={handleCountriesSelection}
          >
            <option value="">
              {/* Selector para la selección de países */}
              Choose a Country or Countries
            </option>
            {countries &&
              countries.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
          </select>

          {/* Campo de entrada para mostrar los países seleccionados */}
          <input
            className={styles.inputCountry}
            name="countries"
            type="text"
            value={input.countries}
            onChange={handleInputChange}
            placeholder="Country"
          />
          {errors.countries && (
            <p className={styles.errorMessage}>{errors.countries}</p>
          )}

          {/* Botón para crear la actividad */}
          <input
            className={styles.btnCrear}
            onClick={onCLickSubmit}
            type="submit"
            value="Create Tourist Activity"
          />
        </form>
      </div>
    </div>
  );
}

// Función que mapea el estado de Redux a las props del componente.
const mapStateToProps = (state) => {
  return {
    countries: state.allCountries,
  };
};
// Función que mapea las acciones de Redux a las props del componente.
const mapDispatchToProps = (dispatch) => {
  return {
    activityPost: (activity) => dispatch(postActivity(activity)),
    getAllCountries: () => dispatch(getCountries()),
    getActivities: () => dispatch(getActivities()),
  };
};

ActivityPost.propTypes = activityPostPropTypes;
// Conecta el componente a Redux y exporta la versión conectada.
export default connect(mapStateToProps, mapDispatchToProps)(ActivityPost);

