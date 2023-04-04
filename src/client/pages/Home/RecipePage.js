import "../../../App.css";
import { useParams } from "react-router-dom";
import RecipeDetails from "../../components/RecipeDetails";

export default function RecipePage() {
  let { id, version } = useParams();

  return (
    <div>
      <RecipeDetails
        id={id}
        version={version}
        buttons={["Commencer à cuisiner", "Modifier la recette"]}
      />
    </div>
  );
}
