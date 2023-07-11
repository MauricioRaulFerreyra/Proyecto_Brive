import { useNavigate } from "react-router-dom";
import "../css/navbar.css";

export function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="NavBar">
      <img onClick={() => navigate("/home")} className="Logo" src="/logo.png" alt="" />
      <button onClick={() => navigate("/conditions")} className="Terms">
        Terms + conditions
      </button>
    </nav>
  );
}
