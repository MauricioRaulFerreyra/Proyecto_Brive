import { useEffect, useState } from "react";
import { Characters } from "../components/Characters";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Home({ isLoggedIn }) {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  function getCharacters(pageNumber = 1) {
    return fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then(({ results }) => results)
      .catch(() => []);
  }

  async function fetchCharacters() {
    const charactersData = await getCharacters();
    setCharacters(charactersData);
  }

  useEffect(() => {
    fetchCharacters();
  }, []);

  // Verificar si el usuario está logueado, de lo contrario, redirigir a la página de inicio de sesión
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleCharacterClick = (characterId) => {
    navigate(`/character/${characterId}`);
  };

  return (
    <div className="App">
      <div className="Hero">
        <h1>Rick and Morty</h1>
        <h1>See all the characters. And more.</h1>
      </div>

      <main>
        <h1>Character list</h1>
        <hr />
        <div className="card-container">
          {characters.map((character) => (
            <Characters
              key={character.id}
              character={character}
              onCharacterClick={handleCharacterClick}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
