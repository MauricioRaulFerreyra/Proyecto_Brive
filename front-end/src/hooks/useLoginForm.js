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

/* Descomentar cuando funcione el enlace
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
        "https://localhost:7146/prueba/guardar/api/usuario/validar",
        {
          method: 'POST',
          body: JSON.stringify({
            correo: email,
            clave: password,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      )
      .then((response) => response.json())
      .then((json) => console.log(json));

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
*/