import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RiHeartAddFill } from "react-icons/ri";
import hero2 from "../assets/images/hero-marvel3.jpg";
import "../assets/styles/Characters.css";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/characters?page=${currentPage}&limit=100&name=${searchName}`
        );
        setCharacters(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 100));
        setLoading(false);
      } catch (error) {
        console.log("Erreur:", error);
      }
    };
    fetchData();
  }, [currentPage, searchName]);

  return (
    <div>
      {loading ? (
        <div>Chargement ...</div>
      ) : (
        <>
          <div>
            <img className="hero2" src={hero2} alt="hero marvel" />
          </div>

          <div>
            <input
              type="text"
              value={searchName}
              placeholder="Recherche des personnages..."
              onChange={(event) => {
                setSearchName(event.target.value);
              }}
            />
          </div>

          <div className="container characters">
            {characters.map((character) => (
              <Link to={`/characters/${character._id}`} key={character._id}>
                <div className="character-card">
                  <img
                    className="characters-img"
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                  />

                  <RiHeartAddFill className="heart-icon" />
                  <h3>{character.name}</h3>
                  <p>{character.description || null}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
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
