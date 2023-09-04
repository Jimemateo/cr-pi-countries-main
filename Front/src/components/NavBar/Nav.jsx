import SearchBar from "../SearchBar/SearchBar.jsx";
import SearchBarActivity from "../CardsActivities/ActivitySearchBar.jsx";
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
        <SearchBarActivity />{" "}
        {/* Renderiza el componente SearchBarActivity para buscar actividades turísticas */}
        <Link to="/">
          <button className={styles.backBtn}>Back</button>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
