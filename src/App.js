import './App.css';
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import Employees from "./components/Employees/employees";

import Vendors from './containers/Purchasing/Vendors';
import VendorDetails from './containers/Purchasing/VendorDetails';
import Purchases from './containers/Purchasing/Purchases';
import PurchaseDetails from './containers/Purchasing/PurchaseDetails';


function App() {
  return (

    <div className="App">

      <BrowserRouter>

      <Routes>
        <Route path="/" element={<h1>Dashboard</h1>}></Route>
        <Route path="/employees" element={<Employees/>} />
        <Route path="/vendors" element={<Vendors />}/>
        <Route path="/vendors/:id" element={<VendorDetails />}/>
        <Route path="/purchases" element={<Purchases />}/>
        <Route path="/purchases/:id" element={<PurchaseDetails />}/>
      </Routes>
          
      </BrowserRouter>

     {/* <Employees></Employees> */}
    </div>


  );
}

export default App;
