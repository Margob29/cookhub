// librairies for BD
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const { default: axios } = require("axios");
const app = express();

// connexion to BD
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cookhub",
});

// params for the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Le serveur tourne sur ${PORT}`);
});

//to allow a request from frontend to backend, access to datas
app.use(cors());

//to say that datas are transmitted in json format
app.use(express.json());

// ================= CREATE RECIPE ======================
//req = request to grab something from the frontend
//res =  response ton send something to the frontend
app.post("/create", async (req, res) => {
  const recipe = req.body.params;
  const name = recipe.name;
  const nbPortion = recipe.nbPortion;
  const preparationTime = recipe.preparationTime;
  const bakingTime = recipe.bakingTime;
  const breakTime = recipe.breakTime;
  const version = 1;
  let id;

  //select the last id to increase by hand the idRecipe in the DB
  db.query("SELECT MAX(idRecipe) as lastId FROM recipe", (err, result) => {
    //to be sure we get back the last id, we call the function create in the else of this request
    err ? console.log(err) : create(result[0].lastId);
  });

  //function which create the new recipe with an id that we precise
  const create = (id) => {
    db.query(
      "INSERT INTO recipe (idRecipe, version, name, nbPortion, preparationTime, bakingTime, breakTime) VALUES (?,?,?,?,?,?,?)",
      [
        id + 1,
        version,
        name,
        nbPortion,
        preparationTime,
        bakingTime,
        breakTime,
      ],
      (err, result) => {
        err ? console.log(err) : res.send(id + 1);
      }
    );
  };
});

// ================= READ RECIPE ======================
//Get recipe details and ingredients with its id and version
app.get("/details", (req, res) => {
  const recipeId = req.query.idRecipe;
  const version = req.query.version;
  db.query(
    "SELECT r.name as nameR, r.nbPortion, r.preparationTime, r.bakingTime, r.breakTime, i.name as nameI, quantity, unit FROM ingredient AS i INNER JOIN stepneed AS sn ON i.idIngredient=sn.idIngredient INNER JOIN preparation AS p ON p.idStep=sn.idStep INNER JOIN recipe as r ON r.idRecipe=p.idRecipe AND r.version=p.idVersion AND r.idRecipe= ? AND r.version= ?",
    [recipeId, version],
    (err, result) => {
      if (err) console.log(err);
      else {
        //array with all the ingredients (objects with the name, quantity and unit) of the recipe
        const ingr = result.map((recipe) => {
          return {
            nameI: recipe.nameI,
            quantity: recipe.quantity,
            unit: recipe.unit,
          };
        });
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
      console.log(result);
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

// ================= READ VERSION ======================
//Get all the versions of a recipe exept teh version taht we are watching
app.get("/versions/", (req, res) => {
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

// ================= READ CATEGORY ======================
//Get all the categories
app.get("/categories", (req, res) => {
  db.query("SELECT * FROM category", (err, result) => {
    err ? console.log(err) : res.send(result);
  });
});

// ================= UPDATE RECIPE ======================
// ================= DELETE RECIPE ======================
