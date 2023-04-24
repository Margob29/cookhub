import "../../../App.css";
import logo from "../../../images/logo_violet.png";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

// Form for creation with classic information for the recipe
export default function CreationForm() {
  const location = useLocation();
  const recipe = location.state?.recipe;
  const navigate = useNavigate();

  const [name, setName] = useState(recipe?.name);
  const [nbPortions, setNbPortions] = useState(recipe?.nbPortion);
  const [preparationTime, setPreparationTime] = useState(
    recipe?.preparationTime
  );
  const [bakingTime, setBakingTime] = useState(recipe?.bakingTime || "");
  const [breakTime, setBreakTime] = useState(recipe?.breakTime || "");
  const [listCategories, setListCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dish, setDish] = useState(); //vérifier que c'est bien un nombre qu'on récupère
  const [diet, setDiet] = useState([]);

  // Function to get informations from the DB
  const getAllCategories = () => {
    Axios.get("http://localhost:3001/categories")
      .then((response) => {
        setListCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getCategories = () => {
    Axios.get("http://localhost:3001/recipeCategories", {
      params: {
        idRecipe: recipe.idRecipe,
        version: recipe.version,
      },
    })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to add a recipe with parametres from the form
  const addRecipe = () => {
    if (!name || !nbPortions || !preparationTime || !dish) {
      //TODO : empêcher la validation
    } else {
      Axios.post("http://localhost:3001/create", {
        params: {
          name: name,
          nbPortion: nbPortions,
          preparationTime: preparationTime,
          bakingTime: bakingTime == "" ? 0 : bakingTime,
          pauseTime: breakTime == "" ? null : breakTime,
          idRecipe: location.state?.idRecipe || -1,
          version: location.state?.version || 1,
        },
      })
        .then(async (res) => {
          // Add dish category
          await AddCategories(res.data.id, dish);
          // Add others categories if there are
          if (diet.length > 0) {
            console.log(diet);
            diet.map(async (d, key) => {
              await AddCategories(res.data.id, d);
            });
          }
          // Redirection to the next page
          navigate(`/creationprogress/${res.data.id}/${res.data.version}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Add categories linked to the recipe
  const AddCategories = async (idRecipe, idCategory) => {
    const integerVersion = parseInt(location.state?.version);
    return Axios.post("http://localhost:3001/categories", {
      params: {
        idRecipe,
        idVersion: integerVersion + 1 || 1,
        idCategory: idCategory,
      },
    }).catch((error) => console.log(error));
  };

  // Activate function when the page is charged
  useEffect(() => {
    getAllCategories();
    if (location.state) getCategories();
  }, []);

  return (
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
                <label className="me-2 labelname">Nom de la recette* :</label>
              </div>
              <div className="col-7">
                <input
                  type="text"
                  className="labelname"
                  required
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />{" "}
              </div>
            </div>
            <div className="row mb-3 d-flex justify-content-center">
              <div className="col-4">
                <label className="me-2 labelname">Nombre de portions* :</label>
              </div>
              <div className="col-7">
                <input
                  type="number"
                  className="labelname"
                  required
                  value={nbPortions}
                  onChange={(event) => {
                    setNbPortions(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row mb-3 d-flex justify-content-center">
              <div className="col-4">
                <label className="me-2 labelname">
                  Temps de préparation* :
                </label>
              </div>
              <div className="col-7">
                <input
                  type="number"
                  className="labelname"
                  required
                  value={preparationTime}
                  onChange={(event) => {
                    setPreparationTime(event.target.value);
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
                  value={bakingTime}
                  onChange={(event) => {
                    setBakingTime(event.target.value);
                  }}
                />{" "}
                <span className="labelname"> minutes.</span>
              </div>
            </div>
            <div className="row mb-3 d-flex justify-content-center">
              <div className="col-4">
                <label className="me-2 labelname">Temps de pause :</label>
              </div>
              <div className="col-7">
                <input
                  type="number"
                  className="labelname"
                  value={breakTime}
                  onChange={(event) => {
                    setBreakTime(event.target.value);
                  }}
                />{" "}
                <span className="labelname"> minutes.</span>
              </div>
            </div>
            <div className="row mb-3 d-flex justify-content-center">
              <div className="col-4">
                <label className="me-2 labelname">Type de plat*: </label>
              </div>
              {/* Choose a type of dish */}
              <div className="col-7">
                <select
                  className="labelname"
                  name="dish"
                  id="dish"
                  onChange={(event) => setDish(event.target.value)}
                >
                  <option value="">-- Choisir --</option>
                  {listCategories.map((categ, index) => {
                    if (categ.idCategory <= 7) {
                      return (
                        <option value={categ.idCategory} key={index}>
                          {categ.name}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>
            </div>
            {/* Possibility to chosse that the recipe has a special diet */}
            <div className="row mb-3 d-flex justify-content-center">
              <div className="col-4">
                <label className="me-2 labelname">Régime: </label>
              </div>
              <div className="col-7">
                <select
                  className="labelname"
                  name="diet"
                  id="diet"
                  multiple
                  onChange={(event) => {
                    // Creation of on array with all the selected options
                    const tab = [];
                    if (event.target.selectedOptions.item(0).value != 0) {
                      for (
                        let i = 0;
                        i < event.target.selectedOptions.length;
                        i++
                      ) {
                        tab.push(event.target.selectedOptions.item(i).value);
                      }
                      // Set the diet with the array
                      setDiet(tab);
                    }
                  }}
                >
                  {listCategories.map((categ, index) => {
                    if (categ.idCategory > 7) {
                      return (
                        <option value={categ.idCategory} key={index}>
                          {categ.name}
                        </option>
                      );
                    }
                  })}
                  <option value="0">Aucun</option>
                </select>
              </div>
            </div>
            <p className="textStyle required">* : champs obligatoires</p>
            <div className="buttons">
              <a className="btnDiscard" href="/">
                Abandonner
              </a>
              {/* Button to add the recipe to the DB */}
              <a className="btnSubmit" type="submit" onClick={addRecipe}>
                Suivant
              </a>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
