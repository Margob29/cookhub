import "../../App.css";
import applePie from "../../images/p.jpeg";
import { Icon } from "@iconify/react";
import Axios from "axios";
import { useState, useEffect } from "react";
import IngredientDetails from "./IngredientDetails";
import { useNavigate } from "react-router-dom";
import StepListItem from "./StepListItem";

// To display all the details from a recipe without the steps
export default function RecipeDetails(props) {
  const [recipe, setRecipe] = useState({});
  const [listIngredients, setListIngredients] = useState([]);
  const [listVersion, setListVersion] = useState([]);
  const navigate = useNavigate();

  // Functions to make requests to the DB
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

  // Call to the function when the page is charged
  useEffect(() => {
    getRecipe(props.id, props.version);
    getAllVersions(props.id, props.version);
  }, []);

  // Functions to navigate between pages
  const BackToCreation = () => {
    navigate(`/creationprogress/${props.id}`);
  };

  const ToSteps = () => {
    navigate(`/steps/${props.id}/${props.version}`);
  };

  return (
    <div>
      {/* Display recipe information */}
      <h3 className="formtitle mb-4 mt-2">
        {recipe.name} - Version n°{props.version}
      </h3>
      <div className="row">
        <div className="col-lg-5 col-sm-12">
          <div className="row d-flex justify-content-center">
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
          {/* Display buttons to cook or create a new version*/}
          {props.buttons.length > 1 ? (
            <div className="row">
              <div className="col-6">
                <a className="btnSubmit" type="submit" onClick={ToSteps}>
                  {props.buttons[0]}
                </a>
              </div>
              <div className="col-6">
                <a href="#" className="btnModify">
                  {props.buttons[1]}
                </a>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* Display details of the recipe */}
        {/* Ingredients */}
        <div className="col-7">
          <div className="row mb-3 me-0 d-flex justify-content-center">
            <h4 className="labelname mt-2">Ingrédients nécessaires :</h4>
            <div className="row text-center">
              {console.log(listIngredients)}
              {listIngredients.length > 0 ? (
                listIngredients.map((ingredient, index) => {
                  return (
                    <IngredientDetails
                      key={index}
                      ingredient={ingredient}
                      size="col-xl-6 col-sm-12 mt-3"
                    />
                  );
                })
              ) : (
                <div className="textStyle">
                  Il n'y a pas d'ingrédients pour cette recette. Es-tu sûr que
                  c'est normal ?
                </div>
              )}
            </div>
          </div>
          {props.stepsList?.length > 0 ? (
            <div className="row mb-3 me-0 d-flex justify-content-center">
              <hr />
              <h4 className="labelname mt-2">Etapes :</h4>
              <div className="row text-center">
                {props.stepsList.map((step, index) => {
                  return <StepListItem step={step} key={index} />;
                })}
              </div>
            </div>
          ) : (
            ""
          )}
          {/* Versions */}
          <div className="row mt-4">
            <hr />
            {props.buttons.length > 1 ? (
              <>
                <h4 className="labelname mb-4">Versions :</h4>
                {listVersion.length == 0 ? (
                  <p className="textStyle">
                    Il n'y a pas d'autres versions. A toi d'en créer une pour
                    que cette recette TE ressemble !
                  </p>
                ) : (
                  listVersion.map((version, index) => {
                    return (
                      <div key={index} className="row">
                        <a
                          href={"/details/" + props.id + "/" + version.version}
                        >
                          Version n°{version.version}
                        </a>
                      </div>
                    );
                  })
                )}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {/* Confirmation for creation */}
      {props.buttons.length <= 1 ? (
        <div className="row d-flex justify-content-center">
          <p className="textStyle text-center">
            <Icon icon="ion:warning" width={30} color={"#A20041"} />
            Attention
            <Icon icon="ion:warning" width={30} color={"#A20041"} /> <br />
            Une fois la recette confirmée, tu ne pourras plus la modifier à
            moins de créer une nouvelle version. <br />
            <span className="warning">
              Assure toi bien que la recette est complète !
            </span>
          </p>
          <div className="col-6">
            <div className="row">
              <div className="col-6">
                <a type="submit" className="btnModify" onClick={BackToCreation}>
                  Retour aux modifications
                </a>
              </div>
              <div className="col-6">
                <a href="/" className="btnSubmit">
                  {props.buttons[0]}
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
