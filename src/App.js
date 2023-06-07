import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

// pages
import Home from './components/Home';
import TempHeader from './components/TempHeader';
import FormTest from "./components/Purchase/FormTest";
import Vendors from './containers/Vendors/Vendors';
import VendorDetails from './containers/Vendors/VendorDetails';

function App() {
  return (
    <section>
      <BrowserRouter>
        <TempHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vendors" element={<Vendors />}/>
          <Route path="/vendors/:id" element={<VendorDetails />}/>
          <Route path="/test" element={<FormTest />} />
        </Routes>
      </BrowserRouter>
    </section>

  );
}

export default App;
