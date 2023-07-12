import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login({ setIsLoggedIn }) {
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const validUser = "usuario";
  const validPassword = "contraseña";

  function handleSubmit(e) {
    e.preventDefault();
    if (nombre === "" || contraseña === "") {
      setError(true);
      return;
    }
    if (nombre !== validUser || contraseña !== validPassword) {
      setError(true);
      alert("Usuario o contraseña incorrectos");
    } else {
      setError(false);
      setIsLoggedIn(true); // Establecer isLoggedIn en verdadero
      navigate("/home");
    }
  }

  return (
    <div className="login-container">
      <section className="Login">
        <h1 className="login-title">Inicia Sesion</h1>
        <form className="formulario" onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="text"
            placeholder="Usuario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <button className="login-button">Iniciar Sesión</button>
        </form>
        {error && !!(nombre === "" || contraseña === "") && (
          <p className="error-message">Todos los campos son obligatorios</p>
        )}
      </section>
    </div>
  );
}
