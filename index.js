const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//Import routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

//connect to db

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to DB");
  }
);

//Middlewares

app.use(express.json());

//Route middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

app.listen(5001, () => {
  console.log("Listening to server at PORT 5001");
});
