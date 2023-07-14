import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../components/Loading";
import axios from "axios";
import { CharacterDescription } from "../components/CharacterDescription";

export function CharacterInfo() {
  const [characterInfo, setCharacterInfo] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/${params.id}`
        );
        setCharacterInfo(response.data);
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching character:", error);
      }
    };

    fetchCharacter();
  }, [params.id]);

  if (!loaded) {
    return <Loading />;
  }

  return (
    <div className="characterinfo">
      <div className="characterinfo-container">
        <CharacterDescription characterInfo={characterInfo} />
      </div>
      <div className="characterinfo-footer">
        <button className="characterinfo-button" onClick={() => navigate("/home")}>
          Return
        </button>
      </div>
    </div>
  );
}
