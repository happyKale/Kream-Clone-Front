import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./redux/store";
import {GlobalStyle} from "./global"
import { hydrate, render } from "react-dom";
 
const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<Provider store={store}>
    <GlobalStyle/>
    <App />
  </Provider>, rootElement);
} else {
  render(<Provider store={store}>
    <GlobalStyle/>
    <App />
  </Provider>, rootElement);
}

// ReactDOM.render(
//   <Provider store={store}>
//     <GlobalStyle/>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
