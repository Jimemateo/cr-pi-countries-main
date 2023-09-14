import styles from './Activity.module.css';
import { ActivityNamePropTypes } from '../propTypes';

// Declara y exporta el componente 'ActivityName'
export default function ActivityName({ activities, onClose, activityNameButtonClose }) {

    return (
        <div className={styles.activityName}>
            {/* Verifica si 'activityNameButtonClose' es verdadero antes de renderizar el contenido. */}
            {activityNameButtonClose ?
                <div>
                    {/* Botón para cerrar la actividad que ejecuta la función 'onClose' cuando se hace clic. */}
                    <button className={styles.btnClose} onClick={onClose}>X</button>
                    <table className={styles.activityInfo} >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Duration</th>
                                <th>Difficulty</th>
                                <th>Season</th>
                                <th>Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                activities.map((activity, i) => (
                                    <tr key={i}>
                                        {/* Muestra el nombre de la actividad. */}
                                        <td>{activity.name}</td>
                                        {/* Muestra la duración de la actividad. */}
                                        <td>{activity.duration}</td>
                                        {/* Muestra la dificultad de la actividad. */}
                                        <td>{activity.difficulty}</td>
                                        {/* Muestra la temporada en la que se puede realizar la actividad. */}
                                        <td>{activity.season}</td>
                                        {/* Muestra los países asociados a la actividad si están disponibles. */}
                                        <td>{activity.Countries ?
                                            JSON.stringify(activity.Countries.map(country => country.name).join(', ')) : null}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                : null}

        </div>
    )
}
ActivityName.propTypes = ActivityNamePropTypes;