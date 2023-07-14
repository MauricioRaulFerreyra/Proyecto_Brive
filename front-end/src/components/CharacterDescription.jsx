import React from "react";

export function CharacterDescription({ characterInfo }) {
  const { name, image, species, gender, origin, location, episode } = characterInfo;

  return (
    <>
      <div className="characterinfo-left">
        <img className="characterinfo-image" src={image} alt={name} />
      </div>
      <div className="characterinfo-right">
        <h2 className="characterinfo-name">{name}</h2>
        <p>
          <strong>Species:</strong>
          {species}
        </p>
        <p>
          <strong>Gender:</strong>
          {gender}
        </p>
        <p>
          <strong>Origin:</strong>
          {origin.name}
        </p>
        <p>
          <strong>Location:</strong>
          {location.name}
        </p>
        <h4>Episodes list:</h4>
        <ul className="characterinfo-list">
          {episode.map((link, epIndex) => {
            const number = link.split("/").slice(-1);
            return (
              <li className="characterinfo-episode" key={epIndex}>
                {number}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
