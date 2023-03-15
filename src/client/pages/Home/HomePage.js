import "../../../App.css";
import cooker from "../../../images/th2.jpeg";

export default function Home() {
  return (
    //TODO : components pour les recettes
    //TODO : superposer le texte et l'image
    //TODO : responsive
    <div className="head">
      <img
        src={cooker}
        alt="Cuisinier"
        width="100%"
        height="auto"
        className="sm-none"
      ></img>
      <div className="presentation">
        <p className="textPresentation">Partage tes talents de cuisinier</p>
        <a className="btnCreation" href="/creation">
          Créer une recette
        </a>
      </div>
    </div>
  );
}
