import "../../App.css";
import IngredientDetails from "../components/IngredientDetails";

// To display details of a step
export default function StepDetails(props) {
  return (
    <div>
      <h5 className="stepName">Etape {props.stepIndex}</h5>
      <div className="row">
        <div className="col-4">
          <h4 className="labelname mb-4">Ingrédients :</h4>
          {props.ingredientsList.map((ingredient, index) => {
            return (
              <div key={index} className="col-12 mb-2">
                {/* Use component to display each ingredient */}
                <IngredientDetails ingredient={ingredient} size="col-12" />
              </div>
            );
          })}
        </div>
        <p className="stepDescription col-8 p-4">{props.step.description}</p>
      </div>
    </div>
  );
}
