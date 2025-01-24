//router for all the comments endpoints where user can READ, CREATE, UPDATE, and DELETE comments and 
// also filter by id.
const express = require("express");
const router = express.Router();
const comments = require("../data/comments");
const posts = require("../data/posts")
const users = require("../data/users")
const bodyParser = require("body-parser");

router.use(bodyParser.json({ extended: true }));



router
  .route("/")
  .get((req, res, next) => {
    //checking if there is userId
    if (req.query.userId) {
      
      //checking if the userId exists
      if (req.query.userId > 0 && req.query.userId <= users[users.length-1].id) {
        const commentsArr = comments.filter(
          (comment) => comment.userId == req.query.userId
        );
        if (commentsArr.length > 0) {
          res.json(commentsArr);
        } else res.send("No comments from this user.");
      } else res.send("No User with this Id.");
      //if there is postId
    } else if (req.query.postId) {
      if (
        //checking if the postId exists
        req.query.postId > 0 &&
        req.query.postId < posts[posts.length - 1].id
      ) {
        const commentsArr = comments.filter((comment) => comment.postId == req.query.postId);
        if (commentsArr.length > 0) {
          res.json(commentsArr);
        } else res.send("No posts with this Id.");
      } else res.send("No posts with this Id.");
    } else {
      //if neither Ids are present responding with all comments
      res.json(comments);
    }
  })
  .post((req, res) => {
    if (req.body.userId && req.body.postId && req.body.body) {
      const comment = {
        id: comments[comments.length - 1].id + 1,
        userId: req.body.userId,
        postId: req.body.postId,
        body: req.body.body,
      };

      comments.push(comment);
      res.json(comments[comments.length - 1]);
    } else res.json({ error: "Insufficient Data for Comment" });
  });
//-----------------------------------------
router
  .route("/:id")
  .get((req, res, next) => {
    const comment = comments.find((comment) => req.params.id == comment.id);
    if (comment) res.json(comment);
    else next();
  })
  //updating any comments by id specified
  .patch((req, res, next) => {
    const comment = comments.find((comment, index) => {
      if (req.params.id == comment.id) {
        comments[index].body = req.body.body;
        return true;
      }
    });
    if (comment) {
      res.json(comment);
    } else next();
  })
  //deleting any comments by id specified
  .delete((req, res, next) => {
    const comment = comments.find((comment, index) => {
      if (req.params.id == comment.id) {
        comments.splice(index, 1);
        return true;
      }
    });
    if (comment) {
      res.json(comment);
    } else next();
  });

module.exports = router;
