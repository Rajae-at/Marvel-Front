import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/Characters.css";
import { Link } from "react-router-dom";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/characters");
        setCharacters(response.data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div className="container characters">
          {characters.map((character) => (
            <Link to={`/character/${character.id}`} key={character.id}>
              <div className="character-card" key={character.id}>
                <img
                  className="characters-img"
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                />
                <h3>{character.name}</h3>
                <p>
                  {character.description || "Pas de description disponible"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Characters;
