import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import { Conditions } from "./Pages/Conditions";
import { NavBar } from "./components/NavBar";
import Footer from "./components/Footer";
import { CharacterInfo } from "./Pages/CharacterInfo";
import { Login } from "./components/Login";
import Occ from "./Pages/Occ";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <header className="Header">
        <NavBar
          isLoggedIn={isLoggedIn}
          handleLogout={() => setIsLoggedIn(false)}
        />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/home" />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/home" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route
            path="/conditions"
            element={
              isLoggedIn ? <Conditions /> : <Navigate to="/login" replace />
            }
          />
          <Route path="/character/:id" element={<CharacterInfo />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/Occ"
            element={
              isLoggedIn ? <Occ /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </BrowserRouter>
  );
}

export default App;
