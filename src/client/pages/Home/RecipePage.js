import "../../../App.css";
import applePie from "../../../images/p.jpeg";
import { Icon } from "@iconify/react";

export default function RecipePage() {
  return (
    //TODO : revoir la taille de la photo
    <div>
      <div className="row">
        <div className="col-lg-6 col-sm-12">
          <div className="row">
            <h3 className="formtitle">Tarte aux pommes</h3>
            <img
              src={applePie}
              alt="Photo recette"
              width="10%"
              height="auto"
            ></img>
          </div>
          <div className="row">
            <div className="col-3 mt-2 d-flex justify-content-center align-items-center text-center">
              <p className="textStyle">
                <Icon icon="ph:knife-fill" width={30} color={"#5837B3"} />
                <br />
                Préparation <br /> 20min
              </p>
            </div>
            <div className="col-3 mt-2 d-flex justify-content-center align-items-center text-center">
              <p className="textStyle">
                <Icon icon="mdi:toaster-oven" width={30} color={"#5837B3"} />
                <br />
                Cuisson <br /> 30min
              </p>
            </div>
            <div className="col-3 mt-2 d-flex justify-content-center align-items-center text-center">
              <p className="textStyle">
                <Icon
                  icon="material-symbols:nest-clock-farsight-analog-outline-rounded"
                  width={30}
                  color={"#5837B3"}
                />
                <br />
                Repos <br /> -
              </p>
            </div>
            <div className="col-3 mt-2 d-flex justify-content-center align-items-center">
              <Icon
                icon="mdi:cards-heart-outline"
                width={30}
                color={"#5837B3"}
              />
            </div>
          </div>
          {/* TODO: selon si on arrive de la création ou pas les boutons ne seront pas les mêmes */}
          <div className="row">
            <div className="col-6">
              <a href="#" className="btnSubmit">
                Commencer à cuisiner
              </a>
            </div>
            <div className="col-6">
              <a href="#" className="btnModify">
                Modifier cette recette
              </a>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="row mb-3 me-0 d-flex justify-content-center">
            <h4 className="labelname mb-4">Ingrédients nécessaires :</h4>
            <div className="row text-center">
              <div className="col-xl-6 col-sm-12">
                <div className="row">
                  <span className="col-6 ingredients">Farine</span>
                  <span className="col-6 ingredients">150g</span>
                </div>
                <hr />
                <div className="row">
                  <span className="col-6 ingredients">Farine</span>
                  <span className="col-6 ingredients">150g</span>
                </div>
                <hr />
              </div>
              <div className="col-xl-5 col-sm-12">
                <div className="row">
                  <span className="col-5 ingredients">Farine</span>
                  <span className="col-5 ingredients">150g</span>
                </div>
                <hr />
                <div className="row">
                  <span className="col-5 ingredients">Farine</span>
                  <span className="col-5 ingredients">150g</span>
                </div>
                <hr />
              </div>
            </div>
          </div>
          <div className="row">
            <h4 className="labelname mb-4">Versions :</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
