import "../../App.css";
import { Icon } from "@iconify/react";

export default function CreationProgress() {
  return (
    <div className="container">
      <h3>Qu'est-ce que tu nous proposes de bon ?</h3>
      <p>Rempli maintenant les étapes pour réaliser ta recette !</p>
      <div>
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Etape 1</h3>
            <p className="card-text">
              Mettre le chocolat au micro onde pour le faire fondre
            </p>
            <a href="#" className="btnModify">
              Modifier
            </a>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Ajouter une étape</h3>
            <a href="#">
              <Icon
                icon="material-symbols:add-circle-outline-rounded"
                width={60}
                color={"#5837B3"}
              />
            </a>
          </div>
        </div>
      </div>
      <div>
        <a className="btnDiscard" href="#">
          Abandonner
        </a>
        <a className="btnSubmit" type="submit" href="#">
          Finaliser la recette
        </a>
      </div>
    </div>
  );
}
