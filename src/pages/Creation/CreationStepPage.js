import { Icon } from "@iconify/react";
import "../../App.css";
import logo from "../../images/logo_violet.png";

export default function StepCreation() {
  return (
    //TODO : remplacer l'icon + par une croix pour supprimer un ingrédient
    //TODO : agrandir la zone de descritpion pour que ça s'écrive en long et pas en ligne
    //TODO : checker le hover du bouton modifier qui veut pas se mettre comme je veux
    //TODO : peut-être mettre autre chose à la place du logo dans le titre
    //TODO : faire la confirmation d'annulation
    <div className="container d-flex justify-content-center">
      <div className="col-sm-12 col-lg-8">
        <form>
          <fieldset className="form p-4 m-4 formcontainer">
            <legend className="formtitle mb-3">
              <img src={logo} alt="Logo" className="logo" />
              Comment réaliser cette étape ?
              <img src={logo} alt="Logo" className="logo" />
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
                  </div>
                  <hr />
                  <div className="row">
                    <span className="col-3 ingredients">Farine</span>
                    <span className="col-3 ingredients">150g</span>
                    <a href="#" className="btnModify col-3 m-0">
                      Modifier
                    </a>
                  </div>
                  <hr />
                  <div className="row">
                    <span className="col-3 ingredients">Farine</span>
                    <span className="col-3 ingredients">150g</span>
                    <a href="#" className="btnModify col-3 m-0">
                      Modifier
                    </a>
                  </div>
                  <hr />
                  <div className="row">
                    <span className="col-3 ingredients">Farine</span>
                    <span className="col-3 ingredients">150g</span>
                    <a href="#" className="btnModify col-3 m-0">
                      Modifier
                    </a>
                    <div className="col-3 d-flex align-items-center justify-content-center">
                      <Icon
                        icon="material-symbols:add-circle-outline-rounded"
                        width={20}
                        color={"#5837B3"}
                      />
                    </div>
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
              <label className="labelname">Description :</label>
              <input type="text" className="labelname" />
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
