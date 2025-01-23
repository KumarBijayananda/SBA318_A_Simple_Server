const express = require("express");
const router = express.Router();
const comments = require("../data/comments");
const bodyParser = require("body-parser");

router.use(bodyParser.json({ extended: true }));


const validateId = (idName, idType = 'number') => {
    return (req, res, next) => {
      const id = req.params[idName];
  
      if (!id) {
        return res.status(400).json({ error: `${idName} is required.` });
      }
  
      if (idType === 'number' && isNaN(Number(id))) {
        return res.status(400).json({ error: `${idName} must be a valid number.` });
      }
  
      if (idType === 'string' && typeof id !== 'string') {
        return res.status(400).json({ error: `${idName} must be a valid string.` });
      }
  
      next();
    };
  };

router
  .route("/")
  .get((req, res, next) => {
    if (req.query.userId) {
      //checking if there is userId

      if (req.query.userId > 0 && req.query.userId <= users.length) {
        const commentsArr = comments.filter(
          (comment) => comment.userId == req.query.userId
        );
        if (commentsArr.length > 0) {
          res.json(commentsArr);
        } else res.send("No comments from this user.");
      } else res.send("No User with this Id.");
    } else if (req.query.postId) {
      if (
        //checking if there is postId
        req.query.postId > 0 &&
        req.query.postId < posts[posts.length - 1].id
      ) {
        const postsArr = posts.filter((post) => post.id == req.query.postId);
        if (postsArr.length > 0) {
          res.json(postsArr);
        } else res.send("No posts with this Id.");
      } else res.send("No posts with this Id.");
    } else {
      //if neither Ids are present responding with all comments
      console.log("all comments");
      res.json(comments);
    }
  })
  .post((req, res) => {
    if (
      users.find((i) => i.id == req.body.userId) &&
      posts.find((i) => i.id == req.body.postId) &&
      req.body.body
    ) {
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
  .get(validateId('id'),(req, res, next) => {
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