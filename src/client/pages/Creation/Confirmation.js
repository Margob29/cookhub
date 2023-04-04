import "../../../App.css";
import { useParams } from "react-router-dom";
import RecipeDetails from "../../components/RecipeDetails";

export default function RecipePage() {
  let { id, version } = useParams();

  return (
    <RecipeDetails
      id={id}
      version={version}
      buttons={["Confirmer la création de la recette"]}
    />
  );
}
