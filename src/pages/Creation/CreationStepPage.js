import { Icon } from "@iconify/react";
import "../../App.css";

export default function StepCreation() {
  return (
    <div>
      <form>
        <fieldset>
          <legend>Comment réaliser cette étape ?</legend>
          <div>
            <p>Ingrédients nécessaires :</p>
            <div className="row">
              <div className="col-6">
                <div className="row">
                  <span className="col-2">Farine</span>
                  <span className="col-2">150g</span>
                  <a href="#" className="btnModify col-2">
                    Modifier
                  </a>
                </div>
              </div>
              <div className="col-3">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Ajouter un ingrédient</h3>
                    <a href="#" className="d-flex justify-content-center">
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
            <label>Description :</label>
            <input type="text"></input>
          </div>
          <div className="buttons">
            <a className="btnDiscard" href="#">
              Annuler
            </a>
            <a className="btnSubmit" type="submit" href="#">
              Valider l'étape
            </a>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
