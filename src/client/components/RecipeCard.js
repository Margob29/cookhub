import "../../App.css";
import { Icon } from "@iconify/react";
import pie from "../../images/p.jpeg";

// Card to dispaly a recipe on the home page
export default function RecipeCard(props) {
  // Get juste the recipe object from the props
  const { recipe } = props;
  return (
    <div className="col-xl-3 col-md-6 col-sm-6 p-0">
      {/* Link to the details of the recipe  */}
      <a
        href={"/details/" + recipe.idRecipe + "/" + recipe.version}
        className="text-decoration-none"
        type="button"
      >
        <div className="card rCard">
          <img src={pie} className="card-img-top" />
          <div className="card-body">
            <div className="row">
              <div className="col-10 pe-1">
                <h5 className="card-title text-truncate">{recipe.name}</h5>
              </div>
              <div className="col-1 m-0 p-0">
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
