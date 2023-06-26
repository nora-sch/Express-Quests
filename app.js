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


app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", verifyToken, movieHandlers.postMovie);
app.use("/api/users", userRouter);
app.post(
  "/api/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
