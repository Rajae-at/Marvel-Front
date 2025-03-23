import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../assets/styles/CharacterComics.css";

const CharacterComics = () => {
  const { id } = useParams();
  const [characterComics, setCharacterComics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching comics for character ID:", id);

        const response = await axios.get(`http://localhost:3000/comics/${id}`);
        console.log("Data received:", response.data);

        setCharacterComics(response.data.comics || []);
        setLoading(false);
      } catch (error) {
        console.log("Erreur lors de la récupération des données :", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="container comic-container">
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div className="comics-list">
          {characterComics.map((comic) => (
            <div className="comic-card" key={comic.id}>
              {comic.thumbnail ? (
                <img
                  className="comics-img"
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                />
              ) : (
                <p>Image non disponible</p>
              )}
              <h3>{comic.title}</h3>
              <p className="comic-description">{comic.description || null}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterComics;
