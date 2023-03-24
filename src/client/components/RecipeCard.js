import "../../App.css";
import { Icon } from "@iconify/react";
import pie from "../../images/p.jpeg";

export default function RecipeCard(props) {
  const { recipe } = props; // = {recipe:""}
  return (
    //TODO : superposer les coeurs "like" sur la photo de la recette
    //TODO : mettre le href à jour selon l'id de la recette en question
    <div className="col-xl-3 col-md-6 col-sm-6 p-0">
      <a
        href={"/details/" + recipe.idRecipe + "/" + recipe.version}
        className="text-decoration-none"
        type="button"
      >
        <div className="card rCard">
          <img src={pie} className="card-img-top" />
          <div className="card-body">
            <div className="row">
              <div className="col-9">
                <h5 className="card-title cardTitle">{recipe.name}</h5>
              </div>
              <div className="col-3">
                <Icon
                  icon="mdi:cards-heart-outline"
                  color={"#A20041"}
                  width={30}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <div className="categoryContainer textStyle">Dessert</div>
              </div>
              {/* TODO QUAND J'AURAIS FAIT LA PARTIE USERS */}
              {/* <div className="col-7 textStyle">
                <p>Fait par Marie</p>
              </div> */}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
