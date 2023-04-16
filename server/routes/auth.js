const express = require("express");
const userModel = require("../models/UserModel");
const app = express();
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");
//multer and body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

//đăng nhập
app.post("/sign", async (req, res) => {
  const user = await userModel.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (!user) {
    return res.render("auth/signIn", {
      alert: "danger",
      message: "Tài khoản hoặc mật khẩu không chính xác!",
    });
  }
  res.render("index", { id: user._id });
});

module.exports = app;
