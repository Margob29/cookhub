import "../../App.css";
import RecipeCard from "./RecipeCard";

// List of the recipe cards
export default function RecipeCardList(props) {
  // Display a recipe card for each recipe in the list of props
  return props.recipesList.map((recipe, index) => {
    return <RecipeCard key={index} recipe={recipe} />;
  });
}
