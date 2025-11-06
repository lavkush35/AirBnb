const express = require("express");
const router = express.Router();

// Index - users
router.get("/", (req, res) => {
    res.send("GET for users ");
})

// Show - users
router.get("/:id", (req, res) => {
    res.send("GET for users id");
});

//POST -  USERS
router.post("/", (req, res) => {
    res.send("POST for users id");
})

// DELETE - users
router.delete("/:id", (req, res) => {
    res.send("DELETE for user ")
})

module.exports = router;