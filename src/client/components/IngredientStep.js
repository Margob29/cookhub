import "../../App.css";
import { Icon } from "@iconify/react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

// Ingredients display when a step is creating. Possibility to modify or delete
export default function IngredientStep(props) {
  const { idIngredient } = props.ingredient;
  let { idRecipe, idStep } = useParams();
  const navigate = useNavigate();

  // Function to delete the ingredient in the DB
  const DeleteIngredient = () => {
    Axios.delete("http://localhost:3001/ingredient", {
      params: { idIngredient },
    })
      .then((res) => {
        if (res.status == 200) props.callBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Navigate to the ingredient page with the form already fill
  const toIngredient = () => {
    navigate(`/addingredient/${idRecipe}/${idStep}`, {
      state: props.ingredient,
    });
  };

  // Props get an ingredient from the BD which is display
  return (
    <div className="rectIngredient mb-2">
      <div className="row">
        <span className="col-3 ingredients">{props.ingredient.name}</span>
        <span className="col-4 ingredients">
          {props.ingredient.quantity} {props.ingredient.unit}
        </span>
        {/* Go to the ingredient creation with the form already fill to modify */}
        <a className="btnModify col-3 m-0" type="submit" onClick={toIngredient}>
          Modifier
        </a>
        {/* Delete the ingredient when the cross is clicked */}
        <a
          className="col-2 d-flex align-items-center justify-content-center"
          onClick={DeleteIngredient}
          type="submit"
        >
          <Icon icon="charm:cross" width={20} color={"#5837B3"} />
        </a>
      </div>
    </div>
  );
}
