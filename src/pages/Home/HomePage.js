import "../../App.css";
import CHNavbar from "../../components/CookHub_navbar";
import cooker from "../../images/th2.jpeg";

export default function Home() {
  return (
    <div>
      <CHNavbar></CHNavbar>
      <img src={cooker} alt="Cuisinier" width="100%" height="250px"></img>
      <div className="container col-6 presentation">
        <p className="textPresentation">Partage tes talents de cuisinier</p>
        <a role="button" className="btnCreation" href="#">
          Créer une recette
        </a>
      </div>
    </div>
  );
}
