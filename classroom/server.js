const express = require("express");
const app = express();
const port = 8000;
const user = require("./routes/user.js");
const post = require("./routes/post.js")

app.get("/", (req, res) => {
    res.send("Hi, i am root!")
})

app.use("/users", user);
app.use("/posts", post);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})