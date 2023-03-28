import "../../../App.css";
import { Icon } from "@iconify/react";
import logo from "../../../images/logo_violet.png";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CreationProgress() {
  //TODO : voir pourquoi j'arrive pas à récupérer le nom de la recette (sur postman ça marche)

  let { id } = useParams();
  const [name, setName] = useState("");

  const getName = (id) => {
    Axios.get("http://localhost:3001/recipeName/", {
      params: { idRecipe: id },
    })
      .then((response) => {
        setName(response.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getName(id);
    console.log(name);
  }, []);

  return (
    //TODO : faire la confirmation d'annulation
    <div className="container d-flex justify-content-center m-3">
      <div className="col-sm-12 col-lg-8 formcontainer p-4">
        <h4 className="formtitle">
          <Icon
            icon="ph:knife-fill"
            color={"#5837B3"}
            width={40}
            className="logo"
          />
          Bouh
          <Icon
            icon="ph:knife-fill"
            color={"#5837B3"}
            width={40}
            className="logo"
          />
        </h4>
        <p className="text-center labelname">
          Explique nous comment faire pour réaliser ta recette !
        </p>
        <div className="row">
          <div className="col-xl-3 col-md-6 col-sm-6">
            <div className="card mb-2 cardstyle">
              <div className="card-body ">
                <h3 className="card-title d-flex justify-content-between">
                  Etape 1{" "}
                  <a href="#" className="d-flex align-items-top">
                    <Icon icon="charm:cross" width={20} color={"#5837B3"} />
                  </a>
                </h3>
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
