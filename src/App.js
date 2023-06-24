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
import Customers from './containers/Sales/CustomerDetails';
import CustomerDetails from './containers/Sales/CustomerDetails';
import Stores from './containers/Sales/Stores';
import StoreDetails from './containers/Sales/StoreDetails';
import { useSelector } from 'react-redux';
import NavigationHeader from './components/NavigationHeader';
import NavigationAside from './components/NavigationAside';



function App() {
  let key = "dashboardLoginStatus"
  const loginContext = useContext(LoginContext);
  const {expanded} = useSelector(state => state.navigation);
  let content;
  // let loginstatus = window.sessionStorage.getItem(key)
  let loginstatus = true; 
  if(loginContext.accepted || loginstatus === true)
  {
    content = (
      <div className="App">
      <BrowserRouter>
      <NavigationAside />
      <div className={expanded ? "expandedRouteContainer" : "routeContainer"}>
      <NavigationHeader />
      <Routes>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/employees" element={<Employees/>} />
        <Route path="/vendors" element={<Vendors />}/>
        <Route path="/vendors/:id" element={<VendorDetails />}/>
        <Route path="/purchases" element={<Purchases />}/>
        <Route path="/purchases/:id" element={<PurchaseDetails />}/>
        <Route path="/stores" element={<Stores />}/>
        <Route path="/stores/:id" element={<StoreDetails />}/>
        <Route path="/customers" element={<Customers />}/>
        <Route path="/customers/:id" element={<CustomerDetails />}/>
      </Routes>
      </div>    
      </BrowserRouter>
    </div>
    )
  }
  else{
    content = (<Login></Login>)
  }
  return content;
}

export default App;
