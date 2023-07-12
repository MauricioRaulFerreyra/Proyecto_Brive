import React from "react";
import { useNavigate } from "react-router-dom";

export function LogoutButton({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Llamar a la función onLogout pasada como prop
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="Logout">
      Logout
    </button>
  );
}
