const express = require("express");
require("dotenv").config();
const userRouter = require("./routes/user");
const { verifyPassword, verifyToken} = require("./auth");

const app = express();
app.use(express.json());
const port = 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./handlers/movieHandlers");
const userHandlers = require("./handlers/userHandlers");

//routes publiques
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post(
  "/api/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);
//routes privées
app.use(verifyToken); // verifyToken sera utilisé pout tt les routes qui suivent cette ligne
app.post("/api/movies", movieHandlers.postMovie);
app.use("/api/users", userRouter);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
