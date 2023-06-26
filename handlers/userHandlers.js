const dbConnection = require("../database");
const findAll = "SELECT firstname, lastname, email, city, language FROM users";
const postOne =
  "INSERT INTO users (firstname, lastname, email, city, language, hashedPassword) VALUES(?, ?, ?, ?, ?, ?)";
const updateOne =
  "UPDATE users SET firstname = ?, lastname = ?, email = ?, city= ?, language = ?, hashedPassword = ? WHERE id = ?";
  const findById = "SELECT firstname, lastname, email, city, language FROM users where id = ?";

const getUsers = (req, res) => {
  dbConnection
    .query(findAll)
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};
const postUser = (req, res) => {
    const { firstname, lastname, email, city, language, hashedPassword } =
      req.body;
    dbConnection
      .query(postOne, [
        firstname,
        lastname,
        email,
        city,
        language,
        hashedPassword,
      ])
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
  }

  const getUserById = (req, res) => {
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
  }

  const modifyUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, email, city, language, hashedPassword } =
      req.body;
    dbConnection
      .query(updateOne, [
        firstname,
        lastname,
        email,
        city,
        language,
        hashedPassword,
        id,
      ])
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  }
module.exports = {
  getUsers,
  postUser,
  getUserById,
  modifyUser
};
