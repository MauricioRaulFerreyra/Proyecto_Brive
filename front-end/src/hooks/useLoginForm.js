import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useLoginForm(setIsLoggedIn) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("Todos los campos son obligatorios");
      return;
    }

    fetch('https://localhost:7146/usuario/listar').then(res => res.json())
        .then(data => {
          const userExist = data.filter(user => user.correo === email && user.clave === password);

          if(userExist.length > 0){
            setError("");
            setIsLoggedIn(true); // Establecer isLoggedIn en verdadero
            navigate("/home");
          }
          else {
            setError("EL correo o la contraseña son incorrectos");
          }
          
        })
        .catch(err => console.log(err));

    // if (email === validEmail && password === validPassword) {
    //   setError("");
    //   setIsLoggedIn(true); // Establecer isLoggedIn en verdadero
    //   navigate("/home");
    // } else if (email !== validEmail) {
    //   setError("La cuenta no existe");
    // } else {
    //   setError("Contraseña incorrecta");
    // }
    
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
