const express = require("express");
const app = express();
const PORT = 3000;

const usersRoute = require("./routes/usersRoute");

//-----------Middleware-------------------

app.use("/api/users", usersRoute);

//
//
//--------------Routes---------------------
app.route("/").get((req, res) => {
  res.send("Welcome to the homepage");
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
