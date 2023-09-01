import {cardPropTypes} from '../propTypes';
import {Link} from 'react-router-dom'; //componente 'Link' de 'react-router-dom' para crear enlaces internos en la aplicación.
import styles from './Card.module.css';

export default function CountryCard ({name, id, flag, population, continent}) {
// Declara y exporta el componente 'CountryCard' que acepta ciertas propiedades como argumentos.
    return (
<div className={`${styles.countryCard}`}>
  <div className={`${styles.countryCardInner}`}>
    <div className={`${styles.countryCardFront}`}>
      {/* Contenido en el frente de la tarjeta */}
      <div className={`${styles.countryCardimg}`}>
        {/* Imagen del país */}
          <img className={styles.img} src={flag} alt={`Flag of ${name}`} />
        
      </div>
    </div>
    <div className={`${styles.countryCardBack}`}>
      {/* Contenido en el dorso de la tarjeta */}
      <Link to={`/detail/${id}`}>
      <h5 className={styles.name}>{name}</h5>
      </Link>
      <p className={styles.textCont}>Continent: {continent}</p>
      <p className={styles.textPop}>Population: {population}</p>
    </div>
  </div>
</div>
 
    )
}
// Define las PropTypes para el componente 'CountryCard' utilizando las PropTypes importadas.
CountryCard.propTypes = cardPropTypes;