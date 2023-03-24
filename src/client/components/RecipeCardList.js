import "../../App.css";
import RecipeCard from "./RecipeCard";

export default function RecipeCardList(props) {
  //.map c'est comme un foreach mais le return est stocké dans un nouveau tableau
  return props.recipesList.map((recipe, index) => {
    return <RecipeCard key={index} recipe={recipe} />;
  });
}

// Composant parent : RecipeCardList
// return recipes.map((recipe, index) => {
//   return <RecipeCard recipe={recipe}></RecipeCard>;
// });
