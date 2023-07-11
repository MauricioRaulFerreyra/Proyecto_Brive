import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login({ setIsLoggedIn }) {
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

  return (
    <div className="login-container">
      <section className="Login">
        <h1 className="login-title">Inicia Sesión</h1>
        <form className="formulario" onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button">Iniciar Sesión</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </section>
    </div>
  );
}
