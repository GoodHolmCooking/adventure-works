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
import Dashboard from './components/dashboard/dashboard';
import { ToastContainer } from 'react-toastify';

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

      <Routes>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/employees" element={<Employees/>} />
        <Route path="/vendors" element={<Vendors />}/>
        <Route path="/vendors/:id" element={<VendorDetails />}/>
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
