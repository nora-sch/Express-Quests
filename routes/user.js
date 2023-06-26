const express = require("express");
const router = express.Router();
const dbConnection = require("../database");
const {hashPassword} = require("../auth");

// const userPostBodyExemple = {
//   "firstname": "Nora",
//   "lastname": "Sumane",
//   "email": "norah@inbox.lv",
//   "city": "Aix en Provence",
//   "language": "JS",
//   "password" :"Pa$$w0rd!"
// } // for JSON body POSTMAN

const findAll = "SELECT * FROM users";
const findById = "SELECT * FROM users where id = ?";
const postOne =
  "INSERT INTO users (firstname, lastname, email, city, language, hashedPassword) VALUES(?, ?, ?, ?, ?, ?)";
const updateOne =
  "UPDATE users SET firstname = ?, lastname = ?, username = ?, email = ?, age= ? WHERE id = ?";

// ROUTE "/"
router.get("/", (req, res) => {
  dbConnection
    .query(findAll)
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
});

router.post("/", hashPassword, (req, res) => {
  const { firstname, lastname, email, city, language, hashedPassword } = req.body;
  dbConnection
    .query(postOne, [firstname, lastname, email, city, language, hashedPassword])
    .then(([result]) => {
      if (result.insertId != null) {
        res.location(`/${result.insertId}`).sendStatus(201);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
});

// ROUTE "/:id"
router.get("/:id", (req, res) => {
  dbConnection
    .query(findById, [parseInt(req.params.id)])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, username, email, age } = req.body;
  dbConnection.query(
    updateOne,
    [firstname, lastname, username, email, age, id],
    (err, result, fields) => {
      if (!err) {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      } else {
        res.status(500).send("Error editing the user");
      }
    }
  );
});

// const getUserById = (req, res) => {
//   const id = parseInt(req.params.id);

//   database
//     .query("SELECT * FROM users WHERE id=?", [id])
//     .then(([user]) => {
//       user[0] != null ? res.status(200).json(user[0]) : res.status(404).send("Page not found");
//     })
//     .catch(err => res.status(500).send("Error retrieving data from database"));
// }

module.exports = router;
