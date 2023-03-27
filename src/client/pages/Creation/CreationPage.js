import "../../../App.css";
import logo from "../../../images/logo_violet.png";
import { useState, useEffect } from "react";
import Axios from "axios";

export default function CreationForm() {
  const [name, setName] = useState("gbfnhtjy");
  const [nbPortions, setNbPortions] = useState(0);
  const [cookTime, setCookTime] = useState(0);
  const [bakeTime, setBakeTime] = useState(0);
  const [pauseTime, setPauseTime] = useState(0);
  const [listCategories, setListCategories] = useState([]);
  const [lastIdRecipe, setLastIdRecipe] = useState(0);

  const getAllCategories = () => {
    Axios.get("http://localhost:3001/categories")
      .then((response) => {
        setListCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //add a recipe with parametres from the form
  const addRecipe = () => {
    console.log("click");
    Axios.post("http://localhost:3001/create", {
      params: {
        name: name,
        nbPortion: nbPortions,
        cookTime: cookTime,
        bakeTime: bakeTime,
        pauseTime: pauseTime,
      },
    })
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.log("on a une erreur");
        console.log(error);
      });
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    //TODO : mettre tous les champs en required
    //TODO : faire en sorte qu'il n'y ait rien de pré-selectionné pour les catégories
    //TODO : faire la confirmation d'annulation

    <div className="container d-flex justify-content-center">
      <div className="col-sm-12 col-lg-8">
        <form>
          <fieldset className="form p-4 m-4 formcontainer">
            <legend className="formtitle mb-3">
              <img src={logo} alt="Logo" className="logo" />
              Qu'est-ce que tu nous proposes de bon ?
              <img src={logo} alt="Logo" className="logo" />
            </legend>
            <div className="row mb-3 d-flex justify-content-center">
              <div className="col-4">
                <label className="me-2 labelname">Nom de la recette :</label>
              </div>
              <div className="col-7">
                <input
                  type="text"
                  className="labelname"
                  required
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />{" "}
              </div>
            </div>
            {/* <div className="col-xl-6 col-md-6 col-sm-12 mb-3">
              <label className="me-2 labelname">Catégories</label>
              <select className="labelname" id="category">
                <option value="">-- Choisir --</option>
                {listCategories.map((categ, index) => {
                  return (
                    <option value={categ.idCategory} key={index}>
                      {categ.name}
                    </option>
                  );
                })}
              </select>
            </div> */}
            <div className="row mb-3 d-flex justify-content-center">
              <div className="col-4">
                <label className="me-2 labelname">Nombre de portions :</label>
              </div>
              <div className="col-7">
                <input
                  type="number"
                  className="labelname"
                  onChange={(event) => {
                    setNbPortions(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row mb-3 d-flex justify-content-center">
              <div className="col-4">
                <label className="me-2 labelname">Temps de préparation :</label>
              </div>
              <div className="col-7">
                <input
                  type="number"
                  className="labelname"
                  onChange={(event) => {
                    setCookTime(event.target.value);
                  }}
                />{" "}
                <span className="labelname"> minutes.</span>
              </div>
            </div>
            <div className="row mb-3 d-flex justify-content-center">
              <div className="col-4">
                <label className="me-2 labelname">Temps de cuisson :</label>
              </div>
              <div className="col-7">
                <input
                  type="number"
                  className="labelname"
                  onChange={(event) => {
                    setBakeTime(event.target.value);
                  }}
                />{" "}
                <span className="labelname"> minutes.</span>
              </div>
            </div>
            <div className="row   mb-3 d-flex justify-content-center">
              <div className="col-4">
                <label className="me-2 labelname">Temps de pause :</label>
              </div>
              <div className="col-7">
                <input
                  type="number"
                  className="labelname"
                  onChange={(event) => {
                    setPauseTime(event.target.value);
                  }}
                />{" "}
                <span className="labelname"> minutes.</span>
              </div>
            </div>
            <div className="buttons">
              <a className="btnDiscard" href="/">
                Abandonner
              </a>
              <a
                className="btnSubmit"
                type="submit"
                // href="/creationprogress"
                onClick={addRecipe}
              >
                Suivant
              </a>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
