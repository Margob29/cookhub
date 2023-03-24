import "../../App.css";
import cooker from "../../images/th2.jpeg";

export default function CarouselPresentation() {
  return (
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img
          src={cooker}
          alt="Cuisinier"
          width="100%"
          height="auto"
          className="d-block w-100"
        ></img>
        <div className="carousel-caption d-flex justify-content-center">
          <div className="presentation">
            <p className="textPresentation">Partage tes talents de cuisinier</p>
            <a className="btnCreation" href="/creation">
              Créer une recette
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
