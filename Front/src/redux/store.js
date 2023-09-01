//import {applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducer.js'
import thunk from 'redux-thunk'
//creamos el store
const store = configureStore({
    reducer: reducers,
     middleware: [thunk]})

export default store;

/*Creación de la tienda:
Se utiliza la función createStore para crear la tienda (store) de Redux. Se le pasa como argumento:

reducer: El reductor raíz que combina todos los reductores individuales en uno solo. Este reductor se define en el archivo importado como reducer.
composeWithDevTools(applyMiddleware(thunk)): Aquí se utiliza la función composeWithDevTools para mejorar la tienda con las herramientas de desarrollo de Redux. Dentro de ella, se aplica el middleware redux-thunk. redux-thunk es un middleware que permite manejar acciones asíncronas en Redux, lo que es útil para hacer peticiones HTTP u otras operaciones asíncronas en las acciones. */