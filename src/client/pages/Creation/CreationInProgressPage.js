import "../../../App.css";
import { Icon } from "@iconify/react";
import logo from "../../../images/logo_violet.png";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StepCard from "../../components/StepCard";

export default function CreationProgress() {
  let { idRecipe } = useParams();
  const [name, setName] = useState("");
  const [listSteps, setListSteps] = useState([]);
  const navigate = useNavigate();

  const getName = (id) => {
    Axios.get("http://localhost:3001/recipeName/", {
      params: { idRecipe: id },
    })
      .then((response) => {
        setName(response.data[0].name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSteps = (id) => {
    Axios.get("http://localhost:3001/steps", {
      params: { idRecipe: id },
    })
      .then((response) => {
        setListSteps(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const AddStep = () => {
    Axios.post("http://localhost:3001/step")
      .then((res) => {
        //redirection to the next page
        navigate(`/creationstep/${idRecipe}/${res.data.idStep}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getName(idRecipe);
    getSteps(idRecipe);
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
          {name}
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
          {listSteps.length > 0
            ? listSteps.map((step, index) => {
                return <StepCard key={index} step={step} />;
              })
            : ""}
          <div className="col-xl-3 col-md-6 col-sm-6">
            <div className="card mb-2 cardstyle">
              <div className="card-body">
                <h3 className="card-title">Ajouter une étape</h3>
                <a
                  type="submit"
                  className="d-flex justify-content-center"
                  onClick={AddStep}
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
