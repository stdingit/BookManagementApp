import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import EditBookPage from './components/EditBookPage'; // Import the Edit Book Page
import Cart from './components/Cart'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/edit/:bookId" element={<EditBookPage />} /> 
        
      </Routes>
    </Router>
  );
}

export default App;
