import "../../App.css";
import applePie from "../../images/p.jpeg";
import { Icon } from "@iconify/react";

export default function RecipePage() {
  return (
    <div>
      <div className="row">
        <div className="col-6">
          <div className="row">
            <h3>Tarte aux pommes</h3>
            <img
              src={applePie}
              alt="Photo recette"
              width="70%"
              height="auto"
            ></img>
          </div>
          <div className="row">
            <div className="col">
              <p>
                <Icon icon="ph:knife-fill" width={30} color={"#5837B3"} />
                <br />
                Préparation <br /> 20min
              </p>
            </div>
            <div className="col">
              <p>
                <Icon icon="mdi:toaster-oven" width={30} color={"#5837B3"} />
                <br />
                Cuisson <br /> 30min
              </p>
            </div>
            <div className="col">
              <p>
                <Icon
                  icon="material-symbols:nest-clock-farsight-analog-outline-rounded"
                  width={30}
                  color={"#5837B3"}
                />
                <br />
                Repos <br /> 0
              </p>
            </div>
            <div className="col">
              <Icon
                icon="mdi:cards-heart-outline"
                width={30}
                color={"#5837B3"}
              />
            </div>
          </div>
          <div className="row">
            <a href="#" className="btnSubmit">
              Commencer à cuisiner
            </a>
            <a href="#" className="btnModify">
              Modifier cette recette
            </a>
          </div>
        </div>
        <div className="col-6">
          <div className="row">
            <p>Ingrédients : </p>
            <span className="col-2">Farine</span>
            <span className="col-2">150g</span>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="row">
            <p>Versions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
