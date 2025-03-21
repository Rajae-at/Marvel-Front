import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/Characters.css";
import { Link } from "react-router-dom";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/characters?page=${currentPage}&limit=100`
        );
        setCharacters(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 100));
        setLoading(false);
      } catch (error) {
        console.log("Erreur:", error);
      }
    };
    fetchData();
  }, [currentPage]);

  return (
    <div>
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div className="container characters">
          {characters.map((character) => (
            <Link to={`/characters/${character._id}`} key={character._id}>
              <div className="character-card">
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

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <span>
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Characters;
