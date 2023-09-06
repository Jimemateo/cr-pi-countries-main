import { useState } from "react";
import { getActivities, cleanActivity } from "../../redux/actions.js";
import { connect } from "react-redux";
import styles from "./Activity.module.css";
import ActivityName from "./ActivityName.jsx";
import { activityPropTypes } from "../propTypes";


function SearchBarActivity({ activity, getActivities, cleanActivity }) {
  // Define estados iniciales para el formulario y el estado del botón.
  const [formActualState, setFormActualState] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [activityNameButtonClose, setActivityNameButtonClose] = useState(true);
  const [hasSearchedAct, setHasSearchedAct] = useState(false); // Nuevo estado



  // Función para cerrar el componente 'ActivityName'.
  function handleActivityNameButtonClose() {
    setActivityNameButtonClose(false);
  }

  // Función para manejar el clic en el botón de búsqueda.
  function handleButtonClick() {
    if (!formActualState) {
      return alert("You must enter an activity name");
    } 
      setButtonClicked(true);
      setActivityNameButtonClose(true);
      setHasSearchedAct(true); // Indicar que se ha realizado una búsqueda

    
  }
  // Función para manejar cambios en el campo de entrada.
  function handleChange(event) {
    setFormActualState(event.target.value); // Actualiza el estado con el valor del campo de búsqueda a medida que se escribe
  }

  // Función para manejar el envío del formulario.
  function handleSubmit(event) {
    getActivities(formActualState); // Realiza una búsqueda de actividad por nombre usando la acción getActivities
    event.preventDefault();
    // Realiza la acción 'getActivities' para buscar una actividad por nombre.
    setFormActualState("");
    cleanActivity(); //Limpia la actividad en el estado Redux
  }

  function handleReset(){
    setButtonClicked(false);
    setHasSearchedAct(false);
    cleanActivity();
    getActivities();
  }

  return (
    <div >
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
            difficulty={activity.difficulty}
            season={activity.season}
            countries={activity.Countries}
            onClose={handleActivityNameButtonClose}
            activityNameButtonClose={activityNameButtonClose}
          />
        ) : null}
        
      </form>
      {/* Mostrar el botón de reset si se ha realizado una búsqueda */}
      {hasSearchedAct && (
        <button className={styles.resetBtn} onClick={handleReset}>
          Show All Activities
        </button>
      )}
    </div>
  );
}

// Función que mapea el estado de Redux a las props del componente.
const mapStateToProps = (state) => {
  return {
    activity: state.activities[0],
  };
};

// Función que mapea las acciones de Redux a las props del componente.
const mapDispatchToProps = (dispatch) => {
  return {
    getActivities: (name) => {
      dispatch(getActivities(name));
    },
    cleanActivity: () => dispatch(cleanActivity()),
  };
};

// Define PropTypes para el componente.
SearchBarActivity.propTypes = activityPropTypes;
// Conecta el componente a Redux y exporta la versión conectada.
export default connect(mapStateToProps, mapDispatchToProps)(SearchBarActivity);
