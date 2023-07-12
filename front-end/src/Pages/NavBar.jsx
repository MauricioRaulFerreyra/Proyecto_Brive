import React from "react";
import { useNavigate } from "react-router-dom";
import { LogoutButton } from "../components/LogoutButton";

export function NavBar({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();

  const handleTermsClick = () => {
    if (isLoggedIn) {
      navigate("/conditions");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="NavBar">
      <img
        onClick={() => {
          if (isLoggedIn) {
            navigate("/home");
          }
        }}
        className={`Logo ${isLoggedIn ? "Clickable" : ""}`}
        src="/logo.png"
        alt=""
      />
      <button
        onClick={handleTermsClick}
        className={`Terms ${isLoggedIn ? "Clickable" : ""}`}
      >
        Terms + conditions
      </button>
      <img
        onClick={() => {
          if (isLoggedIn) {
            navigate("/Occ");
          }
        }}
        className={`Logo ${isLoggedIn ? "Clickable" : ""}`}
        src="/portal.gif"
        alt=""
      />
      {isLoggedIn && <LogoutButton onLogout={handleLogout} />}
    </nav>
  );
}
