import "../../../App.css";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Axios from "axios";

// Page to create an ingredient
export default function AddIngredient() {
  const location = useLocation();
  const [name, setName] = useState(location.state?.name);
  const [quantity, setQuantity] = useState(location.state?.quantity);
  const [unit, setUnit] = useState(location.state?.unit);
  const navigate = useNavigate();
  let { idRecipe, idStep } = useParams();

  // Function to add ingredient to the BD
  const AddIngredient = () => {
    if (!name || !quantity || !unit) {
      //TODO : empêcher la validation
    } else {
      Axios.post("http://localhost:3001/ingredient", {
        params: {
          idStep: idStep,
          ingrName: name,
          quantity: quantity,
          unit: unit,
          idIngredient: location.state?.idIngredient,
        },
      })
        .then(() => {
          navigate(`/creationstep/${idRecipe}/${idStep}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Function to return to the step creation
  const ToStep = () => {
    navigate(`/creationstep/${idRecipe}/${idStep}`);
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="col-sm-12 col-lg-8">
        <form>
          <fieldset className="form p-4 m-4 formcontainer">
            <legend className="formtitle mb-3">
              {" "}
              <Icon
                icon="fluent:food-apple-24-regular"
                color={"#5837B3"}
                width={40}
                className="logo"
              />
              Ingrédient
              <Icon
                icon="fluent:food-apple-24-regular"
                color={"#5837B3"}
                width={40}
                className="logo"
              />
            </legend>
            <p className="text-center labelname">
              Quel est ton ingrédient mystère ?
            </p>
            <br />
            <div className="row mb-3">
              <div className="col d-flex justify-content-center">
                <label className="me-2 labelname">Nom* :</label>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-xl-6 col-md-6 col-sm-12 mb-3">
                <label className="me-2 labelname">Quantité* :</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(event) => {
                    setQuantity(event.target.value);
                  }}
                />
              </div>
              <div className="col-6">
                <label className="me-2 labelname">Unité* : </label>
                <input
                  type="text"
                  value={unit}
                  onChange={(event) => {
                    setUnit(event.target.value);
                  }}
                />
              </div>
              <div>
                <p className="textStyle required">* : champs obligatoires</p>
              </div>
            </div>
            <div className="buttons">
              <a className="btnDiscard" type="submit" onClick={ToStep}>
                Annuler
              </a>
              {/* Button to validate the creation */}
              <a className="btnSubmit" type="submit" onClick={AddIngredient}>
                Ajouter l'ingrédient
              </a>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
