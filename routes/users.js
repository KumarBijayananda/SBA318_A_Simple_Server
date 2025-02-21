//router for all the user endpoints where user can READ, CREATE, UPDATE, and DELETE user and 
// also filter by id and filter comments by specified user id

const express = require("express");
const router = express.Router();
const users = require("../data/users");
const comments=require("../data/comments")
const bodyParser = require("body-parser");

router.use(bodyParser.json({ extended: true }));


//route for /users
router
  .route("/")
  //retrieve all users
  .get((req, res) => {
    res.json(users);
  })
  //create a user
  .post((req, res) => {
    //check if the name, username and email exists
    if (req.body.name && req.body.username && req.body.email) {
      //check if the username is already taken so they can be unique
      if (users.find((u) => u.username == req.body.username)) {
        throw new Error("Username Already Taken");
        return;
      }

      const user = {
        id: users[users.length - 1].id + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };

      users.push(user);
      res.json(users[users.length - 1]);
    } else throw new Error("Insufficient Data");
  });

  //route for specific user using route parameter /:id
router
  .route("/:id")
  .get((req, res, next) => {
    const user = users.find((u) => u.id == req.params.id);
    if (user) res.json(user);
    else next();
  })
  .patch((req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          users[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  })
  .delete((req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        users.splice(i, 1);
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  });

// /:id/comments (retrieves all comments by the specific user id)
// and /:id/comments?postId=<value> (retrieves all comments by the specific user id on the specific post id)
router
.route("/:id/comments")
.get((req, res, next) => {
  const commentsArr = comments.filter(
    (comment) => req.params.id == comment.userId
  );
  if (commentsArr.length > 0) {
    //case for users/:id/comments?postId=<value> by checking if there is postId query
    if (req.query.postId) {
      //checking if there are any comments on the comments array by the specified postId
      if (commentsArr.find((comment) => comment.postId == req.query.postId)) {
        res.json(
          commentsArr.filter((comment) => req.query.postId == comment.postId)
        );
      } else throw new Error("There are no comments in this postId");
    } else {
      res.json(commentsArr);
    }
  } else throw new Error("There are no comments by this user.");
});

module.exports = router;
