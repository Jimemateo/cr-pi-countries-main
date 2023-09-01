import ReactDOM from 'react-dom';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.js';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') // busca el root en el index.html
);
// import React from 'react'
// import ReactDOM from 'react-dom'
// import App from './App.js'
// import './index.module.css'

// ReactDOM.render(
//   <React.StrictMode>
//   <App />
// </React.StrictMode>,
  
//   document.getElementById('root'));