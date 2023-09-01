import { useState } from "react";
import { getActivities } from "../../redux/actions.js";
import { connect } from "react-redux";
import styles from "./Activity.module.css";
import ActivityName from "./ActivityName.jsx";
import { activityPropTypes } from "../propTypes";

function SearchBarActivity({ activity, getActivities }) {
  // Define estados iniciales para el formulario y el estado del botón.
  const [formActualState, setFormActualState] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [activityNameButtonClose, setActivityNameButtonClose] = useState(true);

  // Función para cerrar el componente 'ActivityName'.
  function handleActivityNameButtonClose() {
    setActivityNameButtonClose(false);
  }

  // Función para manejar el clic en el botón de búsqueda.
  function handleButtonClick() {
    if (!formActualState) {
      return alert("That Tourist Activity doesn't exist");
    } else {
      setButtonClicked(true);
      setActivityNameButtonClose(true);
    }
  }
  // Función para manejar cambios en el campo de entrada.
  function handleChange(event) {
    setFormActualState(event.target.value);
  }

  // Función para manejar el envío del formulario.
  function handleSubmit(event) {
    getActivities(formActualState);
    event.preventDefault();
    // Realiza la acción 'getActivities' para buscar una actividad por nombre.
    setFormActualState("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.searchActivity}
          type="text"
          placeholder="For example: Sky, Trekking, ..."
          value={formActualState}
          onChange={handleChange}
        ></input>
        <button
          className={styles.btn}
          onClick={() => handleButtonClick()}
          type="submit"
        >
          Look for an Activity!
        </button>
        {/* Muestra el componente 'ActivityName' si se ha hecho clic en el botón y se encontró una actividad */}
        {buttonClicked && activity.name ? (
          <ActivityName
            name={activity.name}
            duration={activity.duration}
            dificulty={activity.dificulty}
            season={activity.season}
            countries={activity.countries}
            onClose={handleActivityNameButtonClose}
            activityNameButtonClose={activityNameButtonClose}
          />
        ) : null}
      </form>
    </div>
  );
}

// Función que mapea el estado de Redux a las props del componente.
const mapStateToProps = (state) => {
  return {
    activity: state.activity,
  };
};

// Función que mapea las acciones de Redux a las props del componente.
const mapDispatchToProps = (dispatch) => {
  return {
    getActivities: (name) => {
      dispatch(getActivities(name));
    },
  };
};

// Define PropTypes para el componente.
SearchBarActivity.propTypes = activityPropTypes;
// Conecta el componente a Redux y exporta la versión conectada.
export default connect(mapStateToProps, mapDispatchToProps)(SearchBarActivity);
