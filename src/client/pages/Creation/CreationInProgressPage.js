import "../../../App.css";
import { Icon } from "@iconify/react";
import logo from "../../../images/logo_violet.png";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StepCard from "../../components/StepCard";

//TODO : Modifier une step ==> primordial pour les ingrédients

// Page to display the creation progress of the recipe.
// We can see the name and the steps. To see ingredients we have to click on the step
export default function CreationProgress() {
  let { idRecipe } = useParams();
  const [name, setName] = useState("");
  const [listSteps, setListSteps] = useState([]);
  const navigate = useNavigate();

  // Functions to get elements from the BD
  const getName = () => {
    Axios.get("http://localhost:3001/recipeName/", {
      params: { idRecipe },
    })
      .then((response) => {
        setName(response.data[0].name);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getSteps = () => {
    Axios.get("http://localhost:3001/steps", {
      params: { idRecipe, version: 1 },
    })
      .then((response) => {
        setListSteps(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Functions add and delete elements to the BD
  const AddStep = () => {
    Axios.post("http://localhost:3001/step", { params: { idRecipe } })
      .then((res) => {
        //redirection to the next page
        navigate(`/creationstep/${idRecipe}/${res.data.idStep}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const DeleteRecipe = () => {
    Axios.delete("http://localhost:3001/recipe", {
      params: { idRecipe: idRecipe },
    })
      .then(navigate("/"))
      .catch((error) => {
        console.log(error);
      });
  };

  // Activate functions when the page is charged
  useEffect(() => {
    getName();
    getSteps();
  }, []);

  // Navigation to the details of the recipe before validating
  const ToDetails = () => {
    if (listSteps.length == 0) {
      //TODO: avertir qu'il faut au moins une étape
    } else {
      navigate(`/confirmation/${idRecipe}/1`, {
        state: listSteps,
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center m-3">
      <div className="col-sm-12 col-lg-8 formcontainer p-4">
        <h4 className="formtitle">
          <Icon
            icon="ph:knife-fill"
            color={"#5837B3"}
            width={40}
            className="logo"
          />
          {name}
          <Icon
            icon="ph:knife-fill"
            color={"#5837B3"}
            width={40}
            className="logo"
          />
        </h4>
        <p className="text-center labelname">Alors, comment on fait ?</p>
        <div className="row">
          {/* Display all the steps created with cards */}
          {listSteps.length > 0
            ? listSteps.map((step, index) => {
                return (
                  <StepCard
                    key={index}
                    step={step}
                    idRecipe={idRecipe}
                    callBack={getSteps}
                  />
                );
              })
            : ""}
          <div className="col-xl-3 col-md-6 col-sm-6">
            <div className="card mb-2 cardstyle">
              <div className="card-body">
                <h3 className="card-title">Ajouter une étape</h3>
                {/* Button to add a step */}
                <a
                  type="submit"
                  className="d-flex justify-content-center"
                  onClick={AddStep}
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
        <div className="buttons">
          {/* Button to delete a recipe */}
          <a className="btnDiscard" type="submit" onClick={DeleteRecipe}>
            Abandonner
          </a>
          <a className="btnSubmit" type="submit" onClick={ToDetails}>
            Finaliser la recette
          </a>
        </div>
      </div>
    </div>
  );
}
