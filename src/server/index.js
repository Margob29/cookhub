// Librairies for BD
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

// Connexion to BD
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cookhub",
});

// Params for the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Le serveur tourne sur ${PORT}`);
});

// Allow a request from frontend to backend, access to datas
app.use(cors());

// Datas are transmitted in json format
app.use(express.json());

//req = request to grab something from the frontend
//res =  response ton send something to the frontend

// #############################################################################################################
//                                              CREATE
// #############################################################################################################

// --------------- CREATE RECIPE ---------------
// Create recipe with only the main details
app.post("/create", async (req, res) => {
  const recipe = req.body.params;
  const name = recipe.name;
  const nbPortion = recipe.nbPortion;
  const preparationTime = recipe.preparationTime;
  const bakingTime = recipe.bakingTime;
  const breakTime = recipe.breakTime;
  const originalVersion = req.body.params.version;
  let version = 1;
  let id;

  // If it's the first creation of this recipe we create a new one
  if (recipe.idRecipe == -1) {
    //select the last id to increase by hand the idRecipe in the DB
    db.query("SELECT MAX(idRecipe) as lastId FROM recipe", (err, result) => {
      //to be sure we get back the last id, we call the function create in the else of this request
      err ? console.log(err) : create(result[0].lastId + 1, true);
    });
  }
  // If it's just a new version, we duplicate the last one
  else {
    db.query(
      "SELECT MAX(version) as lastVersion FROM recipe WHERE idRecipe=?",
      [recipe.idRecipe],
      (err, result) => {
        //to be sure we get back the last version, we call the function create in the else of this request
        if (err) console.log(err);
        else {
          version = result[0].lastVersion + 1;
          id = recipe.idRecipe;
          create(id, false);
        }
      }
    );
  }

  // Function which create the new recipe with an id that we precise
  const create = (id, isNew) => {
    db.query(
      "INSERT INTO recipe (idRecipe, version, name, nbPortion, preparationTime, bakingTime, breakTime) VALUES (?,?,?,?,?,?,?)",
      [id, version, name, nbPortion, preparationTime, bakingTime, breakTime],
      (err, result) => {
        if (err) console.log(err);
        else if (!isNew) newSteps();
        res.send({ id, version });
      }
    );
  };

  // Function to duplicate the steps and their connexion to the new version which is created
  const newSteps = () => {
    db.query(
      "SELECT s.idStep, s.description, p.stepIndex FROM step AS s INNER JOIN preparation AS p ON p.idStep=s.idStep WHERE p.idRecipe=? AND p.idVersion=?",
      [id, originalVersion],
      (err, result) => {
        if (err) console.log(err);
        else
          result.forEach((step) => {
            db.query(
              "INSERT INTO step (description) VALUES (?)",
              [step.description],
              (err, insertResult) => {
                if (err) console.log(err);
                else {
                  db.query(
                    "INSERT INTO preparation VALUES (?, ?, ?, ?)",
                    [id, version, insertResult.insertId, step.stepIndex],
                    (err, insertRes) => {
                      if (err) console.log(err);
                      else newIngredients(step.idStep, insertResult.insertId);
                    }
                  );
                }
              }
            );
          });
      }
    );
  };

  // Function to duplicate the ingredients and their relations to steps when a new version of a recipe is created
  const newIngredients = (idOriginalStep, idNewStep) => {
    db.query(
      "INSERT INTO ingredient (name) SELECT i.name FROM ingredient AS i INNER JOIN stepneed AS s ON i.idIngredient=s.idIngredient WHERE s.idStep=?",
      [idOriginalStep],
      (err, result) => {
        if (err) console.log(err);
        else
          db.query(
            "SELECT i.idIngredient FROM ingredient AS i INNER JOIN stepneed AS s ON i.idIngredient=s.idIngredient WHERE s.idStep=?",
            [idOriginalStep],
            (err, selectResult) => {
              if (err) console.log(err);
              else
                for (let i = 0; i < result.affectedRows; i++) {
                  db.query(
                    "INSERT INTO stepneed SELECT ?, ?, quantity, unit FROM stepneed WHERE idStep=? AND idIngredient=?",
                    [
                      idNewStep,
                      i + result.insertId,
                      idOriginalStep,
                      selectResult[i].idIngredient,
                    ],
                    (err, jpp) => (err ? console.log(err) : "")
                  );
                }
            }
          );
      }
    );
  };
});

// --------------- CREATE INGREDIENT ---------------
// Create or update ingredient and its link to a step
app.post("/ingredient", (req, res) => {
  const { idStep, ingrName, quantity, unit, idIngredient } = req.body.params;

  //If there no existant ingredient, we create one
  if (!idIngredient) {
    db.query(
      "INSERT INTO ingredient (name) VALUES (?)",
      [ingrName],
      (err, result) => {
        err ? console.log(err) : LinkStepIngr(result.insertId);
      }
    );
    const LinkStepIngr = (idIngr) => {
      db.query(
        "INSERT INTO stepneed (idStep, idIngredient, quantity, unit) VALUES (?,?,?,?)",
        [idStep, idIngr, quantity, unit],
        (err, result) => {
          err ? console.log(err) : res.sendStatus(201);
        }
      );
    };
  }
  // if there is one, we update it
  else {
    db.query(
      "UPDATE ingredient SET name = ? WHERE idIngredient = ?",
      [ingrName, idIngredient],
      (err, result) => {
        err ? console.log(err) : UdpateLink();
      }
    );
    const UdpateLink = () => {
      db.query(
        "UPDATE stepneed SET quantity = ?, unit = ? WHERE idStep = ? AND idIngredient = ?",
        [quantity, unit, idStep, idIngredient],
        (err, result) => {
          err ? console.log(err) : res.sendStatus(201);
        }
      );
    };
  }
});

// -------------- CREATE STEP ---------------
// Create a step and its link to a recipe
app.post("/step", (req, res) => {
  const { idRecipe, version } = req.body.params;
  db.query("INSERT INTO step (description) VALUE (null)", (err, result) => {
    err ? console.log(err) : preparation(result.insertId);
  });

  const preparation = (idStep) => {
    db.query(
      "INSERT INTO preparation (idRecipe, idVersion, idStep, stepIndex) SELECT ?, ?, ?, IF(MAX(stepIndex) IS NULL, 1, MAX(stepIndex)+1) FROM preparation WHERE idRecipe=? AND idVersion =?; ",
      [idRecipe, version, idStep, idRecipe, version],
      (err, result) => {
        err ? console.log(err) : res.send({ idStep });
      }
    );
  };
});

// -------------- CREATE LINK TO CATEGORY --------------
// Link the categories selected to the recipe
app.post("/categories", (req, res) => {
  const { idRecipe, idVersion, idCategory } = req.body.params;
  db.query(
    "INSERT INTO categorization (idRecipe, idVersion, idCategory) VALUES (?,?,?)",
    [idRecipe, idVersion, idCategory],
    (err, result) => {
      err ? console.log(err) : res.sendStatus(201);
    }
  );
});

// #############################################################################################################
//                                              READ
// #############################################################################################################

// --------------- READ RECIPE ---------------
//Get recipe details and ingredients with its id and version
app.get("/details", (req, res) => {
  const recipeId = req.query.idRecipe;
  const version = req.query.version;
  db.query(
    "SELECT r.name as nameR, r.nbPortion, r.preparationTime, r.bakingTime, r.breakTime, i.name as nameI, quantity, unit FROM ingredient AS i INNER JOIN stepneed AS sn ON i.idIngredient=sn.idIngredient INNER JOIN preparation AS p ON p.idStep=sn.idStep RIGHT JOIN recipe as r ON r.idRecipe=p.idRecipe AND r.version=p.idVersion WHERE r.idRecipe= ? AND r.version= ?",
    [recipeId, version],
    (err, result) => {
      if (err) console.log(err);
      else {
        //array with all the ingredients (objects with the name, quantity and unit) of the recipe
        let ingr = [];
        if (result[0].nameI) {
          ingr = result.map((recipe) => {
            return {
              nameI: recipe.nameI,
              quantity: recipe.quantity,
              unit: recipe.unit,
            };
          });
        }
        //object that contain name, nbPortion etc of the recipe
        const recipe = {
          name: result[0].nameR,
          nbPortion: result[0].nbPortion,
          preparationTime: result[0].preparationTime,
          bakingTime: result[0].bakingTime,
          breakTime: result[0].breakTime,
        };
        res.send({ recipe, ingr });
      }
    }
  );
});

//Get the name of the recipe
app.get("/recipeName", (req, res) => {
  const idRecipe = req.query.idRecipe;
  db.query(
    "SELECT name FROM recipe WHERE idRecipe = ?",
    [idRecipe],
    (err, result) => {
      err ? console.log(err) : res.send(result);
    }
  );
});

//Get all recipes but not the different versions
app.get("/recipes", (req, res) => {
  db.query("SELECT * FROM recipe GROUP BY idRecipe", (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//Get all the steps from a recipe
app.get("/steps", (req, res) => {
  const { idRecipe, version } = req.query;
  console.log(idRecipe, version);
  db.query(
    "SELECT p.stepIndex, s.description, s.idStep FROM step AS s INNER JOIN preparation AS p ON p.idStep=s.idStep AND idRecipe=? AND idVersion=? ORDER BY p.stepIndex",
    [idRecipe, version],
    (err, result) => {
      err ? console.log(err) : res.send(result);
    }
  );
});

//Get the ingredients of a step
app.get("/ingredients", (req, res) => {
  const idStep = req.query.idStep;
  //console.log(idStep);
  db.query(
    "SELECT i.idIngredient, i.name, sn.quantity, sn.unit FROM ingredient AS i INNER JOIN stepneed AS sn ON sn.idIngredient=i.idIngredient WHERE sn.idStep=?",
    [idStep],
    (err, result) => {
      err ? console.log(err) : res.send(result);
    }
  );
});

// --------------- READ VERSION ---------------
//Get all the versions of a recipe exept teh version taht we are watching
app.get("/versions", (req, res) => {
  const idRecipe = req.query.idRecipe;
  const idVersion = req.query.version;
  db.query(
    "SELECT version FROM recipe WHERE idRecipe = ? AND version != ?",
    [idRecipe, idVersion],
    (err, result) => {
      err ? console.log(err) : res.send(result);
    }
  );
});

// --------------- READ CATEGORY ---------------
//Get all the categories
app.get("/categories", (req, res) => {
  db.query("SELECT * FROM category", (err, result) => {
    err ? console.log(err) : res.send(result);
  });
});

// Get the categories of a recipe
app.get("/recipeCategories", (req, res) => {
  const { idRecipe, version } = req.query;
  db.query(
    "SELECT c.name, c.idCategory FROM categorization AS z INNER JOIN category AS c ON c.idCategory=z.idCategory WHERE z.idRecipe=? AND z.idVersion=?",
    [idRecipe, version],
    (err, result) => {
      err ? console.log(err) : res.send(result);
    }
  );
});

// #############################################################################################################
//                                              UPDATE
// #############################################################################################################

// --------------- UPDATE STEP ---------------
app.put("/step", (req, res) => {
  const { description, idStep, idRecipe } = req.body.params;
  db.query(
    "UPDATE step SET description= ? WHERE idStep = ?",
    [description, idStep],
    (err, result) => {
      err ? console.log(err) : res.sendStatus(201);
    }
  );
});

// #############################################################################################################
//                                              DELETE
// #############################################################################################################

// --------------- DELETE STEP ---------------
// Delete a step with its id. In the BD, the delete is on cascade and that will also delete its link to the recipe
app.delete("/step", (req, res) => {
  const { idStep } = req.query;

  db.query("DELETE FROM step WHERE idStep = ?", [idStep], (err, result) => {
    err ? console.log(err) : res.sendStatus(200);
  });
});

// --------------- DELETE INGREDIENT ---------------
// Delete an ingredient with its id. In the BD, the delete is on cascade and that will also delete its link to the step
app.delete("/ingredient", (req, res) => {
  const { idIngredient } = req.query;

  db.query(
    "DELETE FROM ingredient WHERE idIngredient = ?",
    [idIngredient],
    (err, result) => {
      err ? console.log(err) : res.sendStatus(200);
    }
  );
});

// --------------- DELETE RECIPE ---------------
//Delete only the main informations of a recipe
app.delete("/recipe", (req, res) => {
  const { idRecipe, version } = req.query;

  db.query(
    "DELETE FROM recipe WHERE idRecipe = ? AND version=?",
    [idRecipe, version],
    (err, result) => {
      err ? console.log(err) : "";
    }
  );
});
