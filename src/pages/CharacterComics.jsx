import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
    <div>
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div className="container characters">
          {characterComics.map((comic) => (
            <div key={comic.id}>
              {comic.thumbnail ? (
                <img
                  className="characters-img"
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                />
              ) : (
                <p>Image non disponible</p>
              )}
              <h3>{comic.title}</h3>
              <p>{comic.description || "Pas de description disponible"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterComics;
