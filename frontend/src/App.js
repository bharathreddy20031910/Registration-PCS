import React from 'react';
import './App.css';
import Navbar from './assets/components/Navbar';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import RegistrationPage from './assets/components/Registrationpage';
import Calender from './assets/components/Calender';
import './index.css'; 
import Admin from './assets/components/Admin';
import About from './assets/components/About';




function App() {
  return (
<div>
<Router>
<Routes>
  <Route path='/' element={<Navbar/>}/>
<Route path='/calendar' element={<Calender />} />
<Route path='/registration' element={<RegistrationPage />} />
<Route path='/admin' element={<Admin />} />
<Route path='/about' element={<About />} />

</Routes>
</Router>
 
</div>
  );
}

export default App;
