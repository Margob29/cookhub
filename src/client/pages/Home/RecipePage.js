import "../../../App.css";
import applePie from "../../../images/p.jpeg";
import { Icon } from "@iconify/react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeCardList from "../../components/RecipeCardList";
import Ingredient from "../../components/Ingredient";

export default function RecipePage() {
  let { id, version } = useParams();
  const [recipe, setRecipe] = useState({});
  const [listIngredients, setListIngredients] = useState([]);
  const [listVersion, setListVersion] = useState([]);

  //functions to make requests to the DB
  const getRecipe = (id, version) => {
    Axios.get("http://localhost:3001/details/", {
      params: { idRecipe: id, version: version },
    })
      .then((response) => {
        setListIngredients(response.data.ingr);
        setRecipe(response.data.recipe);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllVersions = (idRecipe, version) => {
    Axios.get("http://localhost:3001/versions/", {
      params: { idRecipe: idRecipe, version: version },
    })
      .then((response) => {
        setListVersion(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //call to the function when the page is charged
  useEffect(() => {
    getRecipe(id, version);
    getAllVersions(id, version);
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-lg-5 col-sm-12">
          <div className="row d-flex justify-content-center">
            <h3 className="formtitle">{recipe.name}</h3>
            <img
              src={applePie}
              alt="Photo recette"
              style={{
                height: "auto",
                width: 350,
              }}
            ></img>
          </div>
          <div className="row">
            <div className="col-3 mt-2 d-flex justify-content-center align-items-center text-center">
              <p className="textStyle">
                <Icon icon="ph:knife-fill" width={30} color={"#5837B3"} />
                <br />
                Préparation <br /> {recipe.preparationTime}min
              </p>
            </div>
            <div className="col-3 mt-2 d-flex justify-content-center align-items-center text-center">
              <p className="textStyle">
                <Icon icon="mdi:toaster-oven" width={30} color={"#5837B3"} />
                <br />
                Cuisson <br /> {recipe.bakingTime}min
              </p>
            </div>
            <div className="col-3 mt-2 d-flex justify-content-center align-items-center text-center">
              <p className="textStyle">
                <Icon
                  icon="material-symbols:nest-clock-farsight-analog-outline-rounded"
                  width={30}
                  color={"#5837B3"}
                />
                <br />
                Repos <br /> {recipe.breakTime ? recipe.breakTime + "min" : "-"}
              </p>
            </div>
            <div className="col-3 mt-2 d-flex justify-content-center align-items-center">
              <Icon
                icon="mdi:cards-heart-outline"
                width={30}
                color={"#A20041"}
              />
            </div>
          </div>
          {/* TODO: selon si on arrive de la création ou pas les boutons ne seront pas les mêmes */}
          <div className="row">
            <div className="col-6">
              <a href="#" className="btnSubmit">
                Commencer à cuisiner
              </a>
            </div>
            <div className="col-6">
              <a href="#" className="btnModify">
                Modifier cette recette
              </a>
            </div>
          </div>
        </div>
        <div className="col-7">
          <div className="row mb-3 me-0 d-flex justify-content-center">
            <h4 className="labelname  mt-4">Ingrédients nécessaires :</h4>
            <div className="row text-center">
              {listIngredients.map((ingredient, index) => {
                return <Ingredient key={index} ingredient={ingredient} />;
              })}
            </div>
          </div>
          <div className="row mt-4">
            <hr />
            <h4 className="labelname mb-4">Versions :</h4>
            {/* TODO: arriver à afficher qu'il n'y a pas d'autres versions */}
            {console.log(listVersion)}
            {listVersion === []
              ? // <p>Il n'y a pas d'autres version</p>
                console.log("pourquoi ça marche pas")
              : listVersion.map((version, index) => {
                  return (
                    <div key={index} className="row">
                      <a href={"/details/" + id + "/" + version.version}>
                        Version n°{version.version}
                      </a>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
}
