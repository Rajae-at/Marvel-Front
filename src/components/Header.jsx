import React, { useState } from "react";
import logo from "../assets/images/marvel-logo.jpg";
import { Link } from "react-router-dom";
import "../assets/styles/Header.css";
// import Cookies from "js-cookie";

const Header = () => {
  // const [userToken, setUserToken] = useState(Cookies.get("token") || null);
  // const existingToken = userToken;
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
          {/* <div> */}
          {/* {existingToken ? ( */}
          {/* <button */}
          {/* className="deconnection" */}
          {/* // onClick={() => { */}
          {/* //   setUser(null); */}
          {/* // }} */}
          {/* > */}
          {/* Se déconnecter */}
          {/* </button> */}
          {/* ) : ( */}
          <>
            {/* <Link to={"/signup"}> */}
            <button>S'inscrire</button>
            {/* </Link> */}
            {/* <Link to={"/login"}> */}
            <button>Se connecter</button>
            {/* </Link> */}
          </>
          {/* )} */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
