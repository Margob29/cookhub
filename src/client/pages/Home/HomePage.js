import "../../../App.css";
import cooker from "../../../images/th2.jpeg";
import RecipeCard from "../../components/RecipeCard";

export default function Home() {
  return (
    <div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src={cooker}
            alt="Cuisinier"
            width="100%"
            height="auto"
            className="d-block w-100"
          ></img>
          <div class="carousel-caption d-flex justify-content-center">
            <div className="presentation">
              <p className="textPresentation">
                Partage tes talents de cuisinier
              </p>
              <a className="btnCreation" href="/creation">
                Créer une recette
              </a>
            </div>
          </div>
        </div>
      </div>
      <a href="#" className="text-decoration-none">
        <div className="mt-3">
          <div className="row ms-3 me-3">
            <div className="col-xl-3 col-md-6 col-sm-6 p-0">
              <RecipeCard />
            </div>
            <div className="col-xl-3 col-md-6 col-sm-6 p-0">
              <RecipeCard />
            </div>
            <div className="col-xl-3 col-md-6 col-sm-6 p-0">
              <RecipeCard />
            </div>
            <div className="col-xl-3 col-md-6 col-sm-6 p-0">
              <RecipeCard />
            </div>
            <div className="col-xl-3 col-md-6 col-sm-6 p-0">
              <RecipeCard />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
