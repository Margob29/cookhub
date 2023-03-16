import "../../App.css";
import { Icon } from "@iconify/react";
import pie from "../../images/p.jpeg";

export default function RecipeCard() {
  return (
    //TODO : superposer les coeurs "like" sur la photo de la recette
    <div className="card rCard">
      <img src={pie} className="card-img-top" />
      <div className="card-body">
        <div className="row">
          <div className="col-9">
            <h5 className="card-title">Tarte aux pommes</h5>
          </div>
          <div className="col-3">
            <Icon icon="mdi:cards-heart-outline" color={"#A20041"} width={30} />
          </div>
        </div>
        <div className="row">
          <div className="col-5">
            <div className="categoryContainer textStyle">Dessert</div>
          </div>
          <div className="col-7 textStyle">
            <p>Fait par Marie</p>
          </div>
        </div>
      </div>
    </div>
  );
}
