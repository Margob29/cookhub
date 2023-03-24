import Axios from "axios";
import "../../../App.css";
import CarouselPresentation from "../../components/CarouselPresentation";
//import RecipeCard from "../../components/RecipeCard";
import RecipeCardList from "../../components/RecipeCardList";
import { useEffect, useState } from "react";

export default function Home() {
  const [recipesList, setRecipesList] = useState([]);
  //request to BD to get the list of all the recipes
  const getRecipes = () => {
    Axios.get("http://localhost:3001/recipes")
      .then((response) => {
        setRecipesList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //getRecipes have to be done when the page is charging
  useEffect(() => {
    //TODO: trouver comment empêcher de déclencher 2 fois
    getRecipes();
  }, []);

  return (
    <div>
      <CarouselPresentation />
      <div className="mt-3">
        <div className="row ms-3 me-3">
          {/*use the request response to display the cards with the recipes*/}
          <RecipeCardList recipesList={recipesList} />
        </div>
      </div>
    </div>
  );
}
