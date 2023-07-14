import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';

export function LogoutButton({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Llamar a la función onLogout pasada como prop
    navigate("/login");
  };

  return (
    <Button danger
    type="primary"
    size="large"
    onClick={handleLogout} className="Logout">
      Logout
    </Button>

  );
}
