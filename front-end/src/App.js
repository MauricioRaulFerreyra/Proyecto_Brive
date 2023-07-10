import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import { Conditions } from './Pages/Conditions';
import './App.css';
import NavBar from './Pages/NavBar';
import Footer from './Pages/Footer';
import { CharacterInfo } from './Pages/CharacterInfo';



function App() {
  return (
    <BrowserRouter>
      <header className="Header" />
        <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/conditions" element={<Conditions />} />
        <Route path="/character/:id" element={<CharacterInfo />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
