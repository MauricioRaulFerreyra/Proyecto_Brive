import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <div className="footer-container">
      <h1>Contenido del footer</h1>
    </div>
  );
}
