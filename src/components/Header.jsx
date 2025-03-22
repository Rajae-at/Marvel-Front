import logo from "../assets/images/marvel-logo.jpg";
import { Link } from "react-router-dom";
import "../assets/styles/Header.css";

const Header = () => {
  return (
    <div className="header-container">
      <div className="container">
        <div className="logo-logo">
          <Link to={"/"}>
            <img className="header-logo" src={logo} alt="Marvel Logo" />
          </Link>
        </div>

        <div className="buttons">
          <Link to={"/characters"}>
            <button>Personnages</button>
          </Link>
          <Link to={"/comics"}>
            <button>Comics</button>
          </Link>
          <button>Favoris</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
