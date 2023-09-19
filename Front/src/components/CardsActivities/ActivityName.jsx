import styles from "./Activity.module.css";
import { ActivityNamePropTypes } from "../propTypes";

// Declara y exporta el componente 'ActivityName'
export default function ActivityName({
  activities,
  onClose,
}) {
  return (
    <div className={styles.activityName}>
        <div>
          {/* Botón para cerrar la actividad que ejecuta la función 'onClose' cuando se hace clic. */}
          <button className={styles.btnClose} onClick={onClose}>
            X
          </button>
          <table className={styles.activityInfo}>
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
              {activities.map((activity, i) => (
                <tr key={i}>
                  <td>{activity.name}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.difficulty}</td>
                  <td>{activity.season}</td>
                  <td>
                    {activity.Countries
                      ? JSON.stringify(
                          activity.Countries.map(
                            (country) => country.name
                          ).join(", ")
                        )
                      : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}
ActivityName.propTypes = ActivityNamePropTypes;
