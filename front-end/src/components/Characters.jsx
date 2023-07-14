import React from "react";
import { useNavigate } from "react-router-dom";

function Characters({ character }) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/character/${character.id}`);
  };

  return (
    <div className="card">
      <h1>{character.name}</h1>
      <img src={character.image} alt="" />
      <div className="card-description">
        <p>
          <strong>Location: </strong>
          {character.location.name}
        </p>
        <p>
          <strong>Status: </strong>
          {character.status}
        </p>
        <p>
          <strong>Specie: </strong>
          {character.species}
        </p>
      </div>
      <button className="card-button" onClick={handleButtonClick}>
        more
      </button>
    </div>
  );
}

export { Characters };
