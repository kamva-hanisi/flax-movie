const path = require("path");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const root = __dirname;

app.use(express.static(root));

app.get("/movie", (req, res) => {
    res.sendFile(path.join(root, "inside", "component", "movie", "index.html"));
});

app.get("/movies", (req, res) => {
    res.sendFile(path.join(root, "inside", "component", "movies", "index.html"));
});

app.listen(port, () => {
    console.log(`Flax Movie is running at http://localhost:${port}`);
});
