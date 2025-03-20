import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/Comics.css";
import { Link } from "react-router-dom";

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/comics");
        setComics(response.data.results);
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
        <div className="container comics">
          {comics.map((comics) => (
            <div>
              <img
                className="comics-img"
                src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
                alt={comics.title}
              />
              <h3>{comics.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comics;
