import "../../App.css";
import { Icon } from "@iconify/react";
import pie from "../../images/p.jpeg";
import Axios from "axios";
import { useEffect, useState } from "react";

// Card to dispaly a recipe on the home page
export default function RecipeCard(props) {
  // Get just the recipe object from the props
  const { recipe } = props;

  const [listCategories, setListCategories] = useState([]);

  // Function to get the categories of the recipe
  const getCategories = () => {
    Axios.get("http://localhost:3001/recipeCategories", {
      params: { idRecipe: recipe.idRecipe, version: recipe.version },
    })
      .then((response) => {
        setListCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    console.log(listCategories);
  }, [listCategories]);

  return (
    <div className="col-xl-3 col-md-6 col-sm-6 p-0">
      {/* Link to the details of the recipe  */}
      <a
        href={"/details/" + recipe.idRecipe + "/" + recipe.version}
        className="text-decoration-none"
        type="button"
      >
        <div className="card rCard">
          <img src={pie} className="card-img-top" />
          <div className="card-body">
            <div className="row">
              <div className="col-10 pe-1">
                <h5 className="card-title text-truncate">{recipe.name}</h5>
              </div>
              <div className="col-1 m-0 p-0">
                <Icon
                  icon="mdi:cards-heart-outline"
                  color={"#A20041"}
                  width={30}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                {listCategories.map((category, index) => {
                  return (
                    <div key={index} className="categoryContainer textStyle">
                      {category.name}
                    </div>
                  );
                })}
              </div>
              {/* TODO QUAND J'AURAIS FAIT LA PARTIE USERS */}
              {/* <div className="col-7 textStyle">
                <p>Fait par Marie</p>
              </div> */}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
