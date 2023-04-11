//import
const express = require("express");
var exphbs = require("express-handlebars");
require("dotenv").config();
const mongoose = require("mongoose");
const useRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const app = express();
//change .handlebars -> .hbs
app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.listen(9999, () => console.log("server is connecting!"));

app.use(express.static("public"));
const fileUpload = require("express-fileupload");
app.use(fileUpload({ useTempFiles: true }));
//connect mongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connect to database");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/users", useRoute);
app.use("/products", productRoute);
//get URL
app.get("/signIn", function (req, res) {
  res.render("auth/signIn");
});
app.get("/signUp", function (req, res) {
  res.render("auth/signUp");
});

app.get("/home", function (req, res) {
  res.render("index");
});

app.get("/product", function (req, res) {
  res.render("product");
});
//

const productsControllter = require("./controller/productsControllter");
app.use("/client/product", productsControllter);
