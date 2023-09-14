import ReactDOM from "react-dom"; 
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";

ReactDOM.render( //renderiza la aplicación en el navegador
//conecta la app de react con el almacén de Redux
  <Provider store={store}>  
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root") // busca el root en el index.html
);
