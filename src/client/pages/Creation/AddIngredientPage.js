import "../../../App.css";
import { useState } from "react";
import { Icon } from "@iconify/react";

export default function AddIngredient() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");
  return (
    //TODO : faire la confirmation d'annulation
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
            <div className="row mb-3">
              <div className="col d-flex justify-content-center">
                <label className="me-2 labelname">Nom :</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-xl-6 col-md-6 col-sm-12 mb-3">
                <label className="me-2 labelname">Quantité :</label>
                <input
                  type="number"
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                />
              </div>
              <div className="col-6">
                <label className="me-2 labelname">Unité : </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setUnit(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="buttons">
              <a className="btnDiscard" href="/creationstep">
                Annuler
              </a>
              <a className="btnSubmit" type="submit" href="/creationstep">
                Ajouter l'ingrédient
              </a>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
