const express = require("express");
const router = express.Router();

// Posts
// Index
router.get("/", (req, res) => {
    res.send("GET for Post");
})

// show
router.get("/:id", (req,res) => {
    res.send("GET for post id");
})

// post
router.get("/", (req, res) => {
    res.send("POST for posts");
})

// Delete
router.get("/:id", (req, res) => {
    res.send("DELETE for post id");
})


module.exports = router;