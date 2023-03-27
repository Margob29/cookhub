// librairies for BD
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
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

//to allow a request from frontend to backend
//pour la sécurité qui donne une certification lui permettant d'accéder aux données
app.use(cors());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
//   // res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

//transmission des données en json sinon il sait pas et il comprend rien
app.use(express.json());

// ================= CREATE RECIPE ======================
//req = request to grab something from the frontend
//res =  response ton send something to the frontend
app.post("/create", (req, res) => {
  console.log("create");
  const name = req.body.name;
  const category = req.body.category;
  const nbPortion = req.body.nbPortion;
  const cookTime = req.body.cookTime;
  const bakeTime = req.body.bakeTime;
  const pauseTime = req.body.pauseTime;
  const version = 2;

  //err
  db.query(
    "INSERT INTO recipe (Version, Name, Category, NbPortion, TimePreparation, TimeBaking, TimeBreak) VALUES (?,?,?,?,?,?,?)",
    [version, name, category, cookTime, bakeTime, pauseTime, nbPortion],
    (err, result) => {
      if (err) console.log(err);
      else res.send("Values inserted");
    }
  );
});

// ================= READ RECIPE ======================

//Get recipe details with its id and version
app.get("/details", (req, res) => {
  const recipeId = req.query.idRecipe;
  const version = req.query.version;
  db.query(
    "SELECT r.name as nameR, r.nbPortion, r.preparationTime, r.bakingTime, r.breakTime, i.name as nameI, quantity, unit FROM ingredient AS i INNER JOIN stepneed AS sn ON i.idIngredient=sn.idIngredient INNER JOIN preparation AS p ON p.idStep=sn.idStep INNER JOIN recipe as r ON r.idRecipe=p.idRecipe AND r.version=p.idVersion AND r.idRecipe= ? AND r.version= ?",
    [recipeId, version],
    (err, result) => {
      if (err) console.log(err);
      else {
        const ingr = result.map((recipe) => {
          return {
            nameI: recipe.nameI,
            quantity: recipe.quantity,
            unit: recipe.unit,
          };
        });
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

//Get all recipes but not the different versions
app.get("/recipes", (req, res) => {
  db.query("SELECT * FROM recipe GROUP BY idRecipe", (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// ================= READ VERSION ======================
//Get all the versions of a recipe
app.get("/versions/", (req, res) => {
  const idRecipe = req.query.idRecipe;
  const idVersion = req.query.version;
  db.query(
    "SELECT version FROM recipe WHERE idRecipe = ? AND version != ?",
    [idRecipe, idVersion],
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});
// ================= UPDATE RECIPE ======================
// ================= DELETE RECIPE ======================

// // Route to get all posts
// app.get("/api/get", (req, res) => {
//   db.query("SELECT * FROM recipe", (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     res.send(result);
//   });
// });

// // Route to get one post
// app.get("/api/getFromId/:id", (req, res) => {
//   const id = req.params.id;
//   db.query("SELECT * FROM posts WHERE id = ?", id, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     res.send(result);
//   });
// });

// // Route for creating the post
// app.post("/api/create", (req, res) => {
//   const username = req.body.userName;
//   const title = req.body.title;
//   const text = req.body.text;

//   db.query(
//     "INSERT INTO posts (title, post_text, user_name) VALUES (?,?,?)",
//     [title, text, username],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       }
//       console.log(result);
//     }
//   );
// });

// // Route to like a post
// app.post("/api/like/:id", (req, res) => {
//   const id = req.params.id;
//   db.query(
//     "UPDATE posts SET likes = likes + 1 WHERE id = ?",
//     id,
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       }
//       console.log(result);
//     }
//   );
// });

// // Route to delete a post

// app.delete("/api/delete/:id", (req, res) => {
//   const id = req.params.id;

//   db.query("DELETE FROM posts WHERE id= ?", id, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//   });
// });
