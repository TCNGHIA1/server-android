//import
const express = require("express");
var exphbs = require("express-handlebars");
require("dotenv").config();
const mongoose = require("mongoose");
const useRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const app = express();

const bodyParser = require("body-parser");
const path = require("path");
//multer and body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

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

//get URL
app.get("/signIn", function (req, res) {
  res.render("auth/signIn");
});
app.get("/signUp", function (req, res) {
  res.render("auth/signUp");
});

//route
const reqFile = require("./routes/middleware");
const route = express.Router();
route.use(reqFile);

//
app.get("/home", function (req, res) {
  if (!req.body.id) {
    res.redirect("/signIn");
  } else {
    res.render("index");
  }
});
//quan li nguoi dung
app.use("/users", useRoute);

//quan li san pham
app.use("/products", productRoute);

const productsControllter = require("./controller/productsControllter");
app.use("/client/product", productsControllter);
// app.use("/", route);

//đăng nhập
const auth = require("./routes/auth");
app.use("/auth", auth);
