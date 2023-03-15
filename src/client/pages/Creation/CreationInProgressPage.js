import "../../../App.css";
import { Icon } from "@iconify/react";
import logo from "../../../images/logo_violet.png";

export default function CreationProgress() {
  return (
    //TODO : finir le responsive (titre)
    //TODO : mettre une croix pour supprimer une étape
    //TODO : faire la confirmation d'annulation
    <div className="container d-flex justify-content-center m-3">
      <div className="col-sm-12 col-lg-8 formcontainer p-4">
        <h4 className="formtitle">
          <img src={logo} alt="Logo" className="logo" />
          Tarte aux pommes
          <img src={logo} alt="Logo" className="logo" />
        </h4>
        <p className="text-center labelname">
          Rempli maintenant les étapes pour réaliser ta recette !
        </p>
        <div className="row">
          <div className="col-xl-3 col-md-6 col-sm-6">
            <div className="card mb-2 cardstyle">
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
          </div>
          <div className="col-xl-3 col-md-6 col-sm-6">
            <div className="card mb-2 cardstyle">
              <div className="card-body">
                <h3 className="card-title">Ajouter une étape</h3>
                <a
                  href="/creationstep"
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
        <div className="buttons">
          <a className="btnDiscard" href="/">
            Abandonner
          </a>
          <a className="btnSubmit" type="submit" href="/details/2">
            Finaliser la recette
          </a>
        </div>
      </div>
    </div>
  );
}
