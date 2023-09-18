import SearchBar from "../SearchBar/SearchBar.jsx";
import CountriesOrderFilters from "../Filter/CountriesFilter.jsx";
import styles from "./Nav.module.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className={styles.navBar}>
      <div className={styles.filters}>
        <CountriesOrderFilters />{" "}
        {/* Renderiza el componente CountriesOrderFilters para ordenar y filtrar países */}
      </div>
      <div className={styles.search}>
        <SearchBar />{" "}
        {/* Renderiza el componente SearchBar para buscar países */}
        <Link to="/">
          <button className={styles.backBtn}>Go Back</button>
        </Link>
        <li>
        <Link to="/activities-search">
         <button className={styles.activitiesBtn}>Activities</button>
          </Link>
        </li>
        

      </div>
    </nav>
  );
}

export default Nav;
