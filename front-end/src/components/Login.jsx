import "../css/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (nombre === "" || contraseña === "") {
      setError(true);
      return;
    }
    setError(false);
    navigate("./home");
  }
  return (
    <>
      <section className="Login">
        <h1>Login</h1> 
        <form className="formulario" onSubmit={handleSubmit}>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
          <button>Iniciar Sesion</button>
        </form>
        {error && <p>Todos los campos son obligatorios</p>}
      </section>
    </>
  );
};
