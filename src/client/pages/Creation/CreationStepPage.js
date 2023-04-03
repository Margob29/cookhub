import { Icon } from "@iconify/react";
import "../../../App.css";
import logo from "../../../images/logo_violet.png";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import IngredientStep from "../../components/IngredientStep";

export default function StepCreation() {
  const [description, setDescription] = useState("");
  const [ingredientsList, setIngredientsList] = useState("");
  let { idRecipe, idStep } = useParams();
  const navigate = useNavigate();

  const getIngredients = () => {
    Axios.get("http://localhost:3001/ingredients", {
      params: { idStep: idStep },
    })
      .then((response) => {
        setIngredientsList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const UpdateStep = () => {
    Axios.put("http://localhost:3001/step", {
      params: { description, idStep, idRecipe },
    })
      .then(() => {
        navigate(`/creationprogress/${idRecipe}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toAddIngredient = () => {
    navigate(`/addingredient/${idRecipe}/${idStep}`);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    //TODO : agrandir la zone de description pour que ça s'écrive en long et pas en ligne
    //TODO : faire la confirmation d'annulation
    //TODO : regarder le margin pour le responsive
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
              Comment réaliser cette étape ?
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
                  {ingredientsList.length > 0 ? (
                    ingredientsList.map((ingredient, index) => {
                      return (
                        <IngredientStep key={index} ingredient={ingredient} />
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
              <label className="labelname">Description :</label>
              <textarea
                className="labelname"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="buttons">
              <a className="btnDiscard" href="/creationprogress">
                Annuler
              </a>
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
