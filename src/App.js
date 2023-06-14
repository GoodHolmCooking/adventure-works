import './App.css';
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import Employees from "./components/Employees/employees";

import Vendors from './containers/Purchase/Vendors';
import VendorDetails from './containers/Purchase/VendorDetails';


function App() {
  return (

    <div className="App">

      <BrowserRouter>

      <Routes>
        <Route path="/" element={<h1>Dashboard</h1>}></Route>
        <Route path="/employees" element={<Employees/>} />
        <Route path="/vendors" element={<Vendors />}/>
        <Route path="/vendors/:id" element={<VendorDetails />}/>
      </Routes>
          
      </BrowserRouter>

     {/* <Employees></Employees> */}
    </div>


  );
}

export default App;
