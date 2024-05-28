import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Employee from './components/Employee';
import Hardware from './components/Hardware';
import Department from './components/Department';
import InternetProvider from './components/InternetProvider';
import Software from './components/Software';
import "./App.css"
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/employee" element={<Employee/>} />
          <Route path="/hardware" element={<Hardware/>} />
          <Route path="/department" element={<Department/>} />
          <Route path="/internet-provider" element={<InternetProvider/>} />
          <Route path="/software" element={<Software/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
