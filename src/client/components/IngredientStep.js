import "../../App.css";
import { Icon } from "@iconify/react";
import Axios from "axios";

export default function IngredientStep(props) {
  const DeleteIngredient = (idIngredient) => {
    Axios.delete("http://localhost:3001/ingredient", {
      params: { idIngredient },
    }).catch((error) => {
      console.log(error);
    });
  };

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
          className="col-2 d-flex align-items-center justify-content-center"
          onClick={DeleteIngredient}
          type="submit"
        >
          <Icon
            icon="charm:cross"
            width={20}
            color={"#5837B3"}
            onClick={DeleteIngredient(props.ingredient.idIngredient)}
          />
        </a>
      </div>
    </div>
  );
}
