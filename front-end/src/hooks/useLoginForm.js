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

    // fetch('https://jsonplaceholder.typicode.com/posts', {
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
