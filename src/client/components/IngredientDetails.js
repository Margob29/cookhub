import "../../App.css";

// Details of an ingredient, display with the details of a recipe
export default function IngredientDetails(props) {
  // Props get an ingredient from the BD which is display
 return (
    <div className={props.size}>
      <div className="rectIngredient">
        <div className="row">
          <span className="col-6 ingredients">
            {props.ingredient.nameI || props.ingredient.name}
          </span>
          <span className="col-6 ingredients">
            {props.ingredient.quantity} {props.ingredient.unit}
          </span>
        </div>
      </div>
    </div>
  );
}
