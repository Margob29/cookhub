import { useEffect, useState } from "react";
import "../../../App.css";
import { useParams } from "react-router-dom";
import Axios from "axios";
import StepDetails from "../../components/StepDetails";
import OtherStep from "../../components/OtherStep";
import { Icon } from "@iconify/react";

// Page to display the steps of a recipe to cook
export default function StepsPage() {
  // useParams is to get id from the url
  let { idRecipe, version } = useParams();
  const [name, setName] = useState("");
  const [stepsList, setListSteps] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [arrayIndex, setArrayIndex] = useState(0);

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
      params: { idRecipe, version },
    })
      .then((response) => {
        setListSteps(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getIngredients = () => {
    Axios.get("http://localhost:3001/ingredients", {
      params: {
        idStep: stepsList.length != 0 ? stepsList[arrayIndex].idStep : 1,
      },
    })
      .then((response) => {
        setIngredientsList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Activate necessary functions when the page is charged
  useEffect(() => {
    getName();
    getSteps();
  }, []);

  // Get ingredients when all the steps are loaded
  useEffect(() => {
    getIngredients();
  }, [arrayIndex, stepsList]);

  console.log(stepsList);
  return (
    <div>
      <h3 className="formtitle mb-4 mt-2">
        {name} - Version n°{version}
      </h3>
      <div className="row">
        <div className="col-2 d-flex align-items-center">
          {/* If we are not at the first step and stepsList is not empty we display the previous step */}
          {arrayIndex > 0 && stepsList.length != 0 ? (
            <OtherStep
              step={stepsList[arrayIndex - 1]}
              currentStep={arrayIndex + 1}
              callBack={() => setArrayIndex(arrayIndex - 1)}
            />
          ) : (
            ""
          )}
        </div>
        {/* Display details of the current step */}
        <div className="col-8">
          {stepsList.length != 0 ? (
            <StepDetails
              stepIndex={arrayIndex + 1}
              ingredientsList={ingredientsList}
              step={stepsList[arrayIndex]}
            />
          ) : (
            ""
          )}
        </div>
        <div className="col-2 d-flex align-items-center justify-content-right">
          {/* If we are not at the last step and stepsList is not empty we display the next step */}
          {arrayIndex < stepsList.length - 1 && stepsList.length != 0 ? (
            <OtherStep
              step={stepsList[arrayIndex + 1]}
              currentStep={arrayIndex + 1}
              callBack={() => setArrayIndex(arrayIndex + 1)}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
