import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useLoginForm(setIsLoggedIn) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validEmail = "usuario@example.com";
  const validPassword = "contraseña";

  function handleSubmit(e) {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (email === validEmail && password === validPassword) {
      setError("");
      setIsLoggedIn(true); // Establecer isLoggedIn en verdadero
      navigate("/home");
    } else if (email !== validEmail) {
      setError("La cuenta no existe");
    } else {
      setError("Contraseña incorrecta");
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
