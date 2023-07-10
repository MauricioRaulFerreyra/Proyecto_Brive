import { useEffect, useState } from "react";
import { Characters } from "../components/Characters";

function Home() {
  const [characters, setCharacters] = useState([]);

  function getCharacters(pageNumber = 1) {
    return fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then(({ results }) => results)
      .catch(() => []);
  }

  async function consoleCharacters() {
    const resp = await getCharacters();
    setCharacters(resp);
    console.log(resp);
  }

  useEffect(() => {
    consoleCharacters();
  }, []);

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
          {characters.length > 0 &&
            characters.map((character) => (
              <Characters key={character.id} character={character} />
            ))}
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export default Home;