import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginContextProvider from './context/loginContext';
import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import employeeSlice from './store/slices/employeeSlice';
// import { configureStore } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://api.bootcampcentral.com/api";
axios.defaults.headers.common["Authorization"] = "MY AUTH TOKEN";

const store = configureStore({
  reducer: {
    employees: employeeSlice,
    displayEmployees: employeeSlice,
  },
  middleware: [thunk],
})


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  // <Provider store={store}>
  //     <App />
  // </Provider>

  <LoginContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </LoginContextProvider>
);

reportWebVitals();
