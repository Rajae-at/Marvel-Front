import hero from "../assets/images/hero.jpg";
import "../assets/styles/Home.css";

const Home = () => {
  return (
    <div className="container hero">
      <img className="container hero-img" src={hero} alt="hero marvel" />
    </div>
  );
};

export default Home;
