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
  module.exports = router;