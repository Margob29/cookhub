import "../../App.css";
import { Icon } from "@iconify/react";

export default function IngredientStep(props) {
  return (
    <div className="rectIngredient mb-2">
      <div className="row">
        <span className="col-3 ingredients">{props.ingredient.name}</span>
        <span className="col-4 ingredients">
          {props.ingredient.quantity} {props.ingredient.unit}
        </span>
        <a href="#" className="btnModify col-3 m-0">
          Modifier
        </a>
        <a
          href="#"
          className="col-2 d-flex align-items-center justify-content-center"
        >
          <Icon icon="charm:cross" width={20} color={"#5837B3"} />
        </a>
      </div>
    </div>
  );
}
