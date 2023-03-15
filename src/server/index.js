const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());

// ================= CREATE RECIPE ======================
app.get("/details/:id/:v", (req, res) => {
  const recipeId = req.params.id;
  const query = "SELECT * FROM recipe WHERE IdRecipe = ? AND Version = ?";

  db.query(q, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
// ================= READ RECIPE ======================
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

const PORT = 3306;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
