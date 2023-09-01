import {Link} from "react-router-dom"; // Importa el componente Link de react-router-dom para navegar a otras páginas
import styles from './LandingPage.module.css'

const LandingPage = () => {
     // Define una función de componente llamada LandingPage

    return (
       <div className={styles.landingpage}>
       <div >
        <p className={styles.parrafo} >WHERE WOULD YOU LIKE TO GO?</p>

        <Link to='/home'>
            <button className={styles.h2button} >✈️ Lets Travel!</button>
        </Link>
    </div>
    </div>
)};

export default LandingPage;