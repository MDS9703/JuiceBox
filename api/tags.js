const express = require("express");
const { getAllTags, getPostsByTagName } = require("../db");

const tagsRouter = express.Router();

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

tagsRouter.get("/", async (req, res, next) => {
  try {
    const tags = await getAllTags();
    res.json({ tags });
  } catch (error) {
    next(error);
  }
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  const { tagName } = req.params; // Read the tagName from the params

  try {
    const posts = await getPostsByTagName(tagName); // Retrieve posts by tag name from the database

    // Filter out inactive posts and posts not owned by the current user
    const filteredPosts = posts.filter(
      (post) => post.active && post.authorId === req.user.id
    );

    res.send({ posts: filteredPosts }); // Send the filtered posts object to the client
  } catch ({ name, message }) {
    next({ name, message }); // Forward the error to the error handler
  }
});

module.exports = tagsRouter;
