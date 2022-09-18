const express = require("express");
const mongoose = require("mongoose");
const Blog = require('./models/blog')

//express app
const app = express();

const dbURI =
  "mongodb+srv://marphilNodeTuts:tuts777@node-tuts.oww90tp.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");

app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    
  })
})

//middleware & static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, labore.",
    },
    {
      title: "Mario finds stars",
      snippet:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, labore.",
    },
    {
      title: "How to defeat Bowser",
      snippet:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, labore.",
    },
  ];

  // render homepage
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  // res.send("./views/index.html");
  res.render("about", { title: "About" });
});

//create blog render
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create new blog" });
});

//404 page, must be at the bottom of the logic
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
