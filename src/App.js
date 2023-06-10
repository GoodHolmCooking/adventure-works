//import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import Employees from "./components/Employees/employees";
//import Login from "./components/login";

function App() {
  return (
    <div className="App">

      <BrowserRouter>


      <Routes>
      <Route path="/" element={<h1>Dashboard</h1>}></Route>
        <Route path="/employees" element={<Employees/>} />
      </Routes>
      </BrowserRouter>

     {/* <Employees></Employees> */}
    </div>
  );
}

export default App;
