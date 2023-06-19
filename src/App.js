import './App.css';
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import Employees from "./components/Employees/employees";

// import { BrowserRouter } from 'react-router-dom';
// import { Routes, Route } from 'react-router-dom';

// pages
// import Home from './components/Home';
// import TempHeader from './components/TempHeader';
// import FormTest from "./components/Purchase/FormTest";
import Vendors from './containers/Purchasing/Vendors';
import VendorDetails from './containers/Purchasing/VendorDetails';
import Login from "./components/login"
import { LoginContext } from "./context/loginContext";
import { useContext } from 'react';
import Dashboard from './components/dashboard/dashboard';
import { ToastContainer } from 'react-toastify';
import Purchases from './containers/Purchasing/Purchases';
import PurchaseDetails from './containers/Purchasing/PurchaseDetails';
import Navigation from './components/Navigation';


function App() {
  let key = "dashboardLoginStatus"
  const loginContext = useContext(LoginContext);
  let content;
  // let loginstatus = window.sessionStorage.getItem(key)
  let loginstatus = true; 
  if(loginContext.accepted || loginstatus === true)
  {
    content = (
      <div className="App">
      <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/employees" element={<Employees/>} />
        <Route path="/vendors" element={<Vendors />}/>
        <Route path="/vendors/:id" element={<VendorDetails />}/>
        <Route path="/purchases" element={<Purchases />}/>
        <Route path="/purchases/:id" element={<PurchaseDetails />}/>
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
