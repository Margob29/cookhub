import { Icon } from "@iconify/react";
import "../../../App.css";
import logo from "../../../images/logo_violet.png";
import { useState } from "react";

export default function StepCreation() {
  const [description, setDescription] = useState("");
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
                  <div className="row">
                    <span className="col-3 ingredients">Farine</span>
                    <span className="col-3 ingredients">150g</span>
                    <a href="#" className="btnModify col-3 m-0">
                      Modifier
                    </a>
                    <a
                      href="#"
                      className="col-3 d-flex align-items-center justify-content-center"
                    >
                      <Icon icon="charm:cross" width={20} color={"#5837B3"} />
                    </a>
                  </div>
                  <hr />
                  <div className="row">
                    <span className="col-3 ingredients">Farine</span>
                    <span className="col-3 ingredients">150g</span>
                    <a href="#" className="btnModify col-3 m-0">
                      Modifier
                    </a>
                    <a
                      href="#"
                      className="col-3 d-flex align-items-center justify-content-center"
                    >
                      <Icon icon="charm:cross" width={20} color={"#5837B3"} />
                    </a>
                  </div>
                  <hr />
                  <div className="row">
                    <span className="col-3 ingredients">Farine</span>
                    <span className="col-3 ingredients">150g</span>
                    <a href="#" className="btnModify col-3 m-0">
                      Modifier
                    </a>
                    <a
                      href="#"
                      className="col-3 d-flex align-items-center justify-content-center"
                    >
                      <Icon icon="charm:cross" width={20} color={"#5837B3"} />
                    </a>
                  </div>
                  <hr />
                  <div className="row">
                    <span className="col-3 ingredients">Farine</span>
                    <span className="col-3 ingredients">150g</span>
                    <a href="#" className="btnModify col-3 m-0">
                      Modifier
                    </a>
                    <a
                      href="#"
                      className="col-3 d-flex align-items-center justify-content-center"
                    >
                      <Icon icon="charm:cross" width={20} color={"#5837B3"} />
                    </a>
                  </div>
                  <hr />
                </div>
                <div className="col-xl-3 col-md-6 col-sm-6 d-flex align-items-center justify-content-center">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title labelname">
                        Ajouter un ingrédient
                      </h5>
                      <a
                        href="/addingredient"
                        className="d-flex justify-content-center"
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
              <label
                className="labelname"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              >
                Description :
              </label>
              <textarea className="labelname" />
            </div>
            <div className="buttons">
              <a className="btnDiscard" href="/creationprogress">
                Annuler
              </a>
              <a className="btnSubmit" type="submit" href="/creationprogress">
                Valider l'étape
              </a>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
