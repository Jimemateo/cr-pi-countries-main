import { useEffect } from "react"; // Importa useEffect de React para realizar efectos secundarios
import { connect } from "react-redux"; // Importa la función connect para conectar el componente a Redux
import { getCountries, getActivities } from '../../../redux/actions.js' // Importa las acciones getCountries y getActivities desde el archivo de acciones
import CountriesCards from '../../Cards/CountriesCards.jsx'
import styles from './HomePage.module.css'
import Nav from '../../NavBar/Nav.jsx'
import {homePropTypes} from '../../propTypes.js';

function Home({ countries, getCountries, getActivities }) {
// Destructura las props countries, getCountries y getActivities del objeto props 
    //getActivities = () => {}
    useEffect(() => {
        // Este efecto se ejecuta cuando el componente se monta
        getCountries() // Llama a la acción getCountries para obtener la lista de países
        getActivities() // Llama a la acción getActivities para obtener la lista de actividades
    }, [])

    return (
        <div className={styles.container}>
            {/* Renderiza el componente Nav para la barra de navegación */}
            <Nav />
            <div>
                {/* Renderiza el componente CountriesCards y pasa la lista de países como prop */}
                <CountriesCards countries={countries} />
            </div>
        </div>
    )


}

const mapStateToProps = (state) => {
    // Define una función mapStateToProps que mapea el estado de Redux a las props del componente
    
    return {
        // Mapea la lista de países desde el estado de Redux a la prop countries
        countries: state.countries
    }
}

const mapDispatchToProps = (dispatch) => {
    // Define una función mapDispatchToProps que mapea las acciones a las props del componente
    return {
        getCountries: () => dispatch(getCountries()), // Mapea la acción getCountries a la prop getCountries
        getActivities: () => dispatch(getActivities()) // Mapea la acción getActivities a la prop getActivities
    }
}

Home.propTypes= homePropTypes; // Define los PropTypes para este componente
// Conecta el componente a Redux y exporta la versión conectada
export default connect(mapStateToProps, mapDispatchToProps)(Home)