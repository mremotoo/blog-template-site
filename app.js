const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

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

app.get("/add-blog", (req, res) => {
  const blog = new Blog({});
});

//middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  // res.send("./views/index.html");
  res.render("about", { title: "About" });
});

//blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.get('/blogs/:id', (req, res)=>{
//   const id = req.params.id;
//   Blog.findById(id)
//     .then(result =>{

//     })
// })

//create blog render
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create new blog" });
});

//404 page, must be at the bottom of the logic
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
