import CountryCard from "../Card/CountryCard.jsx"
import {cardsPropTypes} from "../propTypes.js"
// Importa el hook 'useState' y el hook 'useEffect' de React para el manejo del estado y efectos laterales.
import {useState, useEffect} from "react"; 
// Importa la función 'connect' de 'react-redux' para conectar el componente con el estado de Redux.
import { connect } from "react-redux";
import styles from "./Cards.module.css"
// Importa el componente 'Link' de 'react-router-dom' para crear enlaces internos en la aplicación.
import { Link } from "react-router-dom";

function CountriesCards ({countries}) {

     // Declara un estado para almacenar los países que se mostrarán en la página actual.
    const [actualStateCountries, setActualStateCountries] = useState ([])

    // Define una constante para el número de países por página.
    const countriesPorPage = 10
    // Calcula el número de páginas necesarias según la cantidad de países y el límite de países por página.
    const pages = Math.ceil(countries.length / countriesPorPage)

    // Declara un estado para almacenar la página actual.
    const [currentPage, setCurrentPage] = useState(1)
    
    // Función para mostrar los países de una página específica.
    const showPages = (pageNum) => {
        const index = pageNum * countriesPorPage + 1;
        setActualStateCountries(countries.slice(index - countriesPorPage - 1, index - 1));
        setCurrentPage(pageNum)
    }

    // Usa el efecto para mostrar la primera página de países cuando el arreglo 'countries' cambia.
    useEffect(() => {
        showPages(1)
    }, [countries])

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.searchContainer}>
                    {/* Botón para ir a la página anterior */}
                    <button className={styles.btnIzq} onClick={() => showPages(currentPage > 1 ?
                        currentPage - 1 : currentPage)}>{'«'}</button>
                    <div>
                        {/* Enlace para crear una actividad turística */}
                        <Link to={"/activity"}>
                            <button className={styles.btnActivity}>Create Tourist Activity</button>
                        </Link>
                    </div>
                    {/* Botón para ir a la página siguiente */}
                    <button className={styles.btnDer} onClick={() => showPages(currentPage < pages ?
                        currentPage + 1 : currentPage)}>{`»`}</button>
                </div>
            
            <div className={styles.container}>
                {/* Mapea y muestra los países en 'actualStateCountries' utilizando el componente 'CountryCard' */}
                {actualStateCountries && actualStateCountries.map((country) => (

                        <CountryCard
                            key={country.id}
                            id={country.id}
                            name={country.name}
                            population={country.population}
                            flag={country.flag}
                            continent={country.continent}
                        />
                   

                ))}
            </div>
            </div>
        </>
    )
}
// Función que mapea el estado de Redux a las props del componente.
const mapStateToProps = (state) => {
    return {
        countries: state.countries
    }
}
// Asigna PropTypes al componente 'CountriesCards'.
CountriesCards.propTypes = cardsPropTypes;
// Conecta el componente 'CountriesCards' al estado de Redux y exporta la versión conectada.
export default connect(mapStateToProps, null)(CountriesCards)

/*mapStateToProps mapea una parte del estado de Redux a las
props de nuestro componente, CountriesCards.propTypes
define las reglas para las props que el componente
espera recibir, y connect establece la conexión entre 
Redux y nuestro componente, lo que le permite acceder
al estado de Redux y usarlo en el componente. */