import styles from './Activity.module.css';
import {ActivityNamePropTypes} from '../propTypes';

// Declara y exporta el componente 'ActivityName'
export default function ActivityName({name, duration, difficulty, season, countries, onClose, activityNameButtonClose}) {
    
   return (
     <div >
              {/* Verifica si 'activityNameButtonClose' es verdadero antes de renderizar el contenido. */}       
             {activityNameButtonClose ?
            <div className={styles.activityName}>
               {/* Botón para cerrar la actividad que ejecuta la función 'onClose' cuando se hace clic. */}
               <button className={styles.btnClose} onClick={onClose}>X</button>
                   {/* Muestra el nombre de la actividad. */}
                  <h1>{name}</h1>
                   {/* Muestra la duración de la actividad. */}
                    <p>Duration: {duration}</p>
                     {/* Muestra la dificultad de la actividad. */}
                    <p>Difficulty: {difficulty}</p>
                    {/* Muestra la temporada en la que se puede realizar la actividad. */}
                    <p>Season: {season}</p>
                    {/* Muestra los países asociados a la actividad si están disponibles. */}
                    <p>Countries: {countries ? 
                    JSON.stringify(countries.map(country => country.name).join(', ')) : null}
                    </p>
             </div>
             : null   }
               
        </div>
    )
}
ActivityName.propTypes = ActivityNamePropTypes;