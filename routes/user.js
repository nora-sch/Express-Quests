const express = require("express");
const router = express.Router();
const { hashPassword } = require("../auth");
const userHandlers = require("../handlers/userHandlers");

// {
//   "firstname": "Nora",
//   "lastname": "Sumane",
//   "email": "norah@inbox.lv",
//   "city": "Aix en Provence",
//   "language": "JS",
//   "password" :"Pa$$w0rd!"
// } // for JSON body POSTMAN

// ROUTE "/"
router.get("/", userHandlers.getUsers);
router.post("/", hashPassword, userHandlers.postUser);

// ROUTE "/:id"
router.get("/:id", userHandlers.getUserById);
router.put("/:id", hashPassword, userHandlers.modifyUser);

module.exports = router;
