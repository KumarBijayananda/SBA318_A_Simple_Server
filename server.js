const express = require("express");
const app = express();
const PORT = 3000;

const bodyParser = require("body-parser");
const users = require("./routes/users");
const posts = require("./routes/posts");

//-----------Middleware-------------------
app.use(bodyParser.json({ extended: true }));

app.use("/users", users);
app.use("/posts", posts);

//
//--------------Routes---------------------
app.route("/").get((req, res) => {
  res.send({
    links: [
      {
        href: "/users",
        rel: "users",
        type: "GET",
      },
      {
        href: "/users",
        rel: "users",
        type: "POST",
      },
      {
        href: "/posts",
        rel: "posts",
        type: "GET",
      },
      {
        href: "/posts",
        rel: "posts",
        type: "POST",
      },
    ],
  });
});
//------------error handling---------------

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

//--------------Server---------------------
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
