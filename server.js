const express = require("express");
const app = express();
const PORT = 3000;

const bodyParser = require("body-parser");
const users = require("./routes/users");
const posts = require("./routes/posts");
const comments = require("./routes/comments");

//-----------Middleware-------------------
app.use(bodyParser.json({ extended: true }));

// middleware to timestamp the request with details of the request
app.use((req, res, next) => {
  const time = new Date();
  console.log(
    `----${time.toLocaleTimeString()}: Received a ${req.method} request to ${
      req.url
    }.`
  );
  next();
});

//route handlers for different data types
app.use("/users", users);
app.use("/posts", posts);
app.use("/comments", comments);

//--------------Routes---------------------
app.route("/").get((req, res) => {
  res.send("Welcome to homepage");
});

//------------error handling middleware---------------
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

//if no endpoints are found use this to let the user know
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    path: req.originalUrl,
    method: req.method,
  });
});

//--------------Server---------------------
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
