const express = require("express");
const userModel = require("../models/UserModel");
const app = express();

const bodyParser = require("body-parser");

//multer and body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

//đăng nhập
app.post("/signIn", async (req, res) => {
  const user = await userModel.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (!user) {
    return sendAlertSignIn(
      "danger",
      "Tài khoản hoặc mật khẩu không chính xác",
      res
    );
  }
  res.render("index", { id: user._id });
});
//Đăng kí
app.post("/signUp", async (req, res) => {
  let password = req.body.password;
  let email = req.body.email;
  let fullname = req.body.fullname;
  let code = req.body.code;
  let isAdmin = false;
  if (password == null || email == null) {
    return res.render("auth/signUp", {
      alert: "danger",
      message: "Không để trống email và mật khẩu",
    });
  }
  if (code === "admin") {
    isAdmin = true;
  }
  const user = await userModel.findOne({
    email: req.body.email,
  });

  //kiểm tra email đã tồn tại
  if (user) {
    return res.render("auth/signUp", {
      alert: "danger",
      message: "Tài khoản đã tồn tại!",
    });
  } else {
    const st = new userModel({
      fullname: fullname,
      email: email,
      password: password,
      isAdmin: isAdmin,
    });
    try {
      //đăng kí thành công
      st.save().then((st) => {
        if (st.isAdmin) {
          sendAlertSignIn("success", "Đăng kí quản lí thành công!", res);
        } else {
          sendAlertSignIn("success", "Đăng kí người dùng thành công!", res);
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

//hàm alert
const sendAlertSignIn = (alert, message, res) => {
  res.render("auth/signIn", {
    alert: alert,
    message: message,
  });
};
module.exports = app;
