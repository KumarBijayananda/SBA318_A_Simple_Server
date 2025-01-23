//router for all the posts endpoints where user can READ, CREATE, UPDATE, and DELETE posts and also filter

const express = require("express");
const router = express.Router();
const posts = require("../data/posts");
const bodyParser = require("body-parser");

router.use(bodyParser.json({ extended: true }));

router
  .route("/")
  .get((req, res) => {
    if (req.query.userId) {
      const userId = parseInt(req.query.userId);
      const userPosts = [];
      let maxId = 0;
      users.forEach((element) => {
        if (element.id > maxId) maxId = element.id;
      });

      if (userId > 0 && userId <= maxId) {
        posts.forEach((element) => {
          if (element.userId == userId) userPosts.push(element);
        });
        res.json(userPosts);
      } else res.send("Query not valid");
    } else res.json(posts);
  })
  .post((req, res) => {
    if (req.body.userId && req.body.title && req.body.content) {
      const post = {
        id: posts[posts.length - 1].id + 1,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
      };

      posts.push(post);
      res.json(posts[posts.length - 1]);
    } else res.json({ error: "Insufficient Data" });
  });

  router
  .route("/:id")
  .get((req, res, next) => {
    const post = posts.find((p) => p.id == req.params.id);
    if (post) res.json(post);
    else next();
  })
  .patch((req, res, next) => {
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        for (const key in req.body) {
          posts[i][key] = req.body[key];
        }
        return true;
      }
    });
    console.log(post);
    if (post) res.json(post);
    else next();
  })
  .delete((req, res, next) => {
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        posts.splice(i, 1);
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  });

  
// /:id/comments(retrieves all comments made on the post with the specific post id)
// and /:id/comments?userId=<value> (retrieves all comments made on the specific post by the specific user id)
router.route("/:id/comments").get((req, res, next) => {
    const commentsArr = comments.filter(
      (comment) => req.params.id == comment.postId
    );
    //posts/:id/comments?userId=<value>
    if (commentsArr.length > 0) {
      //checking if there any query by specified userId
      if (req.query.userId) {
        //checking if there any comment by specified userId
        if (commentsArr.find((comment) => comment.userId == req.query.userId)) {
          res.json(
            commentsArr.filter((comment) => req.query.userId == comment.userId)
          );
        } else res.send("There are no comments in this postId");
      } else res.json(commentsArr);
    } else res.json("There are no comments on this post.");
  });
  
  module.exports = router;