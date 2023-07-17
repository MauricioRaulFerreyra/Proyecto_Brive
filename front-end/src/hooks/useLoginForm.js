import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function useLoginForm(setIsLoggedIn) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Todos los campos son obligatorios");
      return;
    }
  
    try {
      const response = await axios.post(
        "https://localhost:7146/prueba/guardar",
        {
          Correo: email,
          Clave: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

    
      const { success, message } = response.data;
  
      if (success) {
        setError("");
        setIsLoggedIn(true);
        navigate("/home");
      } else {
        setError(message);
      }
    } catch (error) {
      console.log(error);
      setError("Error al conectar con el servidor");
    }
  }
  

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
  };
}
