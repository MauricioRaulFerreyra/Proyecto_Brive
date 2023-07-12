import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useLoginForm(setIsLoggedIn) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validEmail = "usuario@example.com";//email
  const validPassword = "contraseña";//password

  function handleSubmit(e) {
    e.preventDefault();

    // const getPrueba=()=> { 
    //   return fetch("https://localhost:7146/prueba/listar")
    //     .then((response) => response.json())
    //     .then((json) => console.log(json))
    //     .catch(() => console.log("No funciona"));
    // };
    // getPrueba();
    if (email === "" || password === "") {
      setError("Todos los campos son obligatorios");
      return;
    }

    // const postPrueba = () => {
    //   return fetch('https://jsonplaceholder.typicode.com/posts', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     email: 'foo',
    //     body: 'bar',
    //     userId: 1,
    //   }),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((json) => console.log(json));
    // }

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
