import "../../../App.css";
import { useParams, useLocation } from "react-router-dom";
import RecipeDetails from "../../components/RecipeDetails";

//TODO : ajouter les étapes

// Page with the details of a recipe and the steps to be sure that the user didn't make a mistake before validating
export default function RecipePage() {
  let { id, version } = useParams();
  const location = useLocation();

  return (
    <div>
      <RecipeDetails
        id={id}
        version={version}
        buttons={["Confirmer la création de la recette"]}
        stepsList={location.state}
      />
    </div>
  );
}
