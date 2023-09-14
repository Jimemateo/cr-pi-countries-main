import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducer.js'
import thunk from 'redux-thunk'
//creamos el store
const store = configureStore({
    reducer: reducers,
     middleware: [thunk]})

export default store;

