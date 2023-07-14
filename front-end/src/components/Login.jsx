import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Login({ setIsLoggedIn }) {
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
          correo: email,
          clave: password,
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
