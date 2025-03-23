import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/Comics.css";
import { Link } from "react-router-dom";
import { RiHeartAddFill } from "react-icons/ri";
import hero3 from "../assets/images/hero-marvel3.jpg";

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comics?page=${currentPage}&limit=100&title=${title}`
        );
        setComics(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 100));
        setLoading(false);
      } catch (error) {
        console.log("Erreur:", error);
      }
    };
    fetchData();
  }, [currentPage, title]);

  return (
    <div>
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <>
          <div>
            <img className="hero3" src={hero3} alt="hero marvel" />
          </div>

          <div>
            <input
              className="form2"
              type="text"
              value={title}
              placeholder="Recherche des comics..."
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>

          <div className="container comics">
            {comics.map((comic) => (
              <Link to={`/comics/${comic._id}`} key={comic._id}>
                <div className="comic-card">
                  <img
                    className="comics-img"
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />
                  <RiHeartAddFill className="heart-icon" />
                  <h3>{comic.title}</h3>
                  <p>{comic.description || null}</p>
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

export default Comics;
