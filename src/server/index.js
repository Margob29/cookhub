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

// var corsOptions = {
//   origin: "http://localhost:3000/",
// };

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
app.get("/details/:id/:v", (req, res) => {
  const recipeId = req.params.id;
  const query = "SELECT * FROM recipe WHERE IdRecipe = ? AND Version = ?";
  db.query(
    "SELECT * FROM recipe WHERE IdRecipe = ? AND Version = ?",
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
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
