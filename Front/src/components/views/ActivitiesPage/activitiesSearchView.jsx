import ActivitySearchBar from "../../CardsActivities/ActivitySearchBar";
import { Link } from "react-router-dom";
import styles from "./activitiesSearchView.module.css"

function ActivitiesSearchView() {
  return (
    <div className={styles.container} >
      <ActivitySearchBar />
      <Link to="/home">
        <button className={styles.homeBtn} >Home</button>
        </Link>
    </div>
  );
}

export default ActivitiesSearchView;
