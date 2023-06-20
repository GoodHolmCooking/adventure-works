import './App.css';
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import Employees from "./components/Employees/employees";

// import { BrowserRouter } from 'react-router-dom';
// import { Routes, Route } from 'react-router-dom';

// pages
// import Home from './components/Home';
// import TempHeader from './components/TempHeader';
// import FormTest from "./components/Purchase/FormTest";
import Vendors from './containers/Purchase/Vendors';
import VendorDetails from './containers/Purchase/VendorDetails';
import Login from "./components/login"
import { LoginContext } from "./context/loginContext";
import { useContext } from 'react';
import { ToastContainer } from 'react-toastify';

import InventoryProducts from './containers/Products/InventoryProducts';
import inventoryDetails from './containers/Products/InventoryDetails';
import catalogDetails from './containers/Products/catalogDetails';
import CatalogProducts from './containers/Products/catalogProducts';


function App() {
  let key = "dashboardLoginStatus"
  const loginContext = useContext(LoginContext);
  let content;
  let loginstatus = window.sessionStorage.getItem(key) 
  if(loginContext.accepted || loginstatus === true)
  {
    content = (
      <div className="App">
      <BrowserRouter>

      <Routes>
        <Route path="/" element={<h1>Dashboard</h1>}></Route>
        <Route path="/employees" element={<Employees/>} />
        <Route path="/vendors" element={<Vendors />}/>
        <Route path="/vendors/:id" element={<VendorDetails />}/>
        <Route path="/inventory" element={<InventoryProducts />}/>
        {/* <Route path="/inventory/:id" element={<InventoryDetails />}/> */}
        <Route path="/catalog" element={<CatalogProducts />}/>
        <Route path="/catalog/:id" element={<catalogDetails />}/>

      </Routes>
          
      </BrowserRouter>
     {/* <Employees></Employees> */}
    </div>
    )
  }
  else{
    content = (<Login></Login>)
  }
  return content;
}

export default App;
