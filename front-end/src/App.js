import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import  Home  from "./Pages/Home";
import { Conditions } from './Pages/Conditions';
import './App.css';
import { NavBar } from './Pages/NavBar';
import Footer from './Pages/Footer';
import { CharacterInfo } from './Pages/CharacterInfo';
import { Login}  from './components/Login';
import { useState } from 'react';



function App() {
  
  return (
    <BrowserRouter>
      <header className="Header" />
      <NavBar />
     <header/> 
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/conditions" element={<Conditions />} />
        <Route path="/character/:id" element={<CharacterInfo />} />
        <Route path="*" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
