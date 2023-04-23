import "../../../App.css";
import { useParams } from "react-router-dom";
import RecipeDetails from "../../components/RecipeDetails";

// Page of the details of a recipe to then cook
export default function RecipePage() {
  // useParams is to get id from the url
  let { id, version } = useParams();

  return (
    <div>
      <RecipeDetails
        id={id}
        version={version}
        // Buttons that we want to display on the component
        buttons={["Commencer à cuisiner", "Créer une version"]}
      />
    </div>
  );
}
