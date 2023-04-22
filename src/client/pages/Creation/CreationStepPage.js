import { Icon } from "@iconify/react";
import "../../../App.css";
import logo from "../../../images/logo_violet.png";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import IngredientStep from "../../components/IngredientStep";

//TODO : regarder le margin pour le responsive

// Page to create a new step to a recipe. Displaying of the ingredient allready linked to this step
export default function StepCreation() {
  const location = useLocation();
  const [description, setDescription] = useState(location.state?.description);
  const [ingredientsList, setIngredientsList] = useState("");
  let { idRecipe, idStep } = useParams();
  const navigate = useNavigate();

  // Function to get existing ingredients from the DB
  const getIngredients = () => {
    Axios.get("http://localhost:3001/ingredients", {
      params: { idStep },
    })
      .then((response) => {
        console.log(response.data);
        setIngredientsList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to update the step with the description entered
  const UpdateStep = () => {
    if (!description) {
      //TODO
    } else {
      Axios.put("http://localhost:3001/step", {
        params: { description, idStep, idRecipe },
      })
        .then(() => {
          navigate(`/creationprogress/${idRecipe}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Function to delete a step
  const DeleteStep = () => {
    Axios.delete("http://localhost:3001/step", {
      params: { idStep },
    })
      .then(() => navigate(`/creationprogress/${idRecipe}`))
      .catch((error) => {
        console.log(error);
      });
  };

  // Activate necessary functions when the page is charged
  useEffect(() => {
    getIngredients();
  }, []);

  // Functions to navigate to other pages
  const toAddIngredient = () => {
    navigate(`/addingredient/${idRecipe}/${idStep}`);
  };

  return (
    <div className="container d-flex justify-content-center p-0">
      <div className="col-lg-8">
        <form>
          <fieldset className="form p-4 m-lg-4 formcontainer">
            <legend className="formtitle mb-3">
              <Icon
                icon="icon-park-outline:cook"
                color={"#5837B3"}
                width={40}
                className="logo"
              />
              Explique nous tes secrets de chef
              <Icon
                icon="icon-park-outline:cook"
                color={"#5837B3"}
                width={40}
                className="logo"
              />
            </legend>
            <div className="row mb-3 d-flex justify-content-center">
              <h4 className="labelname mb-4">Ingrédients nécessaires :</h4>
              <div className="row text-center">
                <div className="col-xl-9 col-sm-12">
                  {/* List of ingredients if there are for this step */}
                  {ingredientsList.length > 0 ? (
                    ingredientsList.map((ingredient, index) => {
                      return (
                        <IngredientStep
                          key={index}
                          ingredient={ingredient}
                          callBack={getIngredients}
                        />
                      );
                    })
                  ) : (
                    <div className="textStyle">
                      Il n'y a pas d'ingrédients pour cette étape. Hésite pas à
                      en ajouter si tu as besoin de quelque chose !
                    </div>
                  )}
                </div>
                <div className="col-xl-3 col-md-6 col-sm-6 d-flex align-items-center justify-content-center">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title labelname">
                        Ajouter un ingrédient
                      </h5>
                      {/* Button to add an ingredient */}
                      <a
                        className="d-flex justify-content-center"
                        type="submit"
                        onClick={toAddIngredient}
                      >
                        <Icon
                          icon="material-symbols:add-circle-outline-rounded"
                          width={60}
                          color={"#5837B3"}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* TODO : essayer de conserver ce qui a été rempli si jamais la personne ajoute un ingrédient entre temps */}
              <label className="labelname">Description* :</label>
              <textarea
                className="labelname"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <p className="textStyle required">* : champ obligatoire</p>
            <div className="buttons">
              <a className="btnDiscard" type="submit" onClick={DeleteStep}>
                Annuler
              </a>
              {/* Button to add a description to the step */}
              <a className="btnSubmit" type="submit" onClick={UpdateStep}>
                Valider l'étape
              </a>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
