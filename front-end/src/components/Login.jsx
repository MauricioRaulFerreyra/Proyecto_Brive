import { useLoginForm } from "../hooks/useLoginForm";

export function Login({ setIsLoggedIn }) {

  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
  } = useLoginForm(setIsLoggedIn);

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
