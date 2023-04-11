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

let URLimage;
var Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, path.dirname(__dirname) + "/public/img/users");
    }
  },
  filename: function (req, file, cb) {
    URLimage = Date.now() + ".jpg";
    cb(null, URLimage);
  },
});
const uploadPic = multer({ storage: Storage }).single("imageURL");

app.get("/", (req, res) => {
  res.render("users/addU", { viewTitle: "Thêm mới" });
});

//get all
app.get("/list", (req, res) => {
  userModel.find({}).then((users) => {
    res.render("users/listUs", {
      users: users.map((user) => user.toJSON()),
    });
  });
});

const fs = require("fs");
const addUser = (req, res) => {
  const st = new userModel({
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    phone: req.body.phone,
    imageURL: URLimage,
  });
  try {
    st.save().then(() => {
      res.render("users/addU", {
        viewTitle: "Thêm mới thành công!",
      });
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
const updateUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.body.id,
      {
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        phone: req.body.phone,
        imageURL: URLimage,
      },
      {
        new: true,
        upsert: true,
      }
    );
    user.save();
    res.redirect("/users/list");
  } catch (err) {
    console.log(err.message);
  }
};
//add user
app.post("/add", uploadPic, (req, res, next) => {
  if (!req.file) {
    console.log("not upload image");
  }
  if (req.body.id == "") {
    addUser(req, res);
  } else {
    updateUser(req, res);
  }
});
//update user
app.get("/edit/:id", (req, res) => {
  userModel
    .findOne({ _id: req.params.id })
    .then((user) => {
      if (user) {
        res.render("users/addU", {
          viewTitle: "Cập nhật thông tin",
          user: user.toJSON(),
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(400, "Bad Request");
    });
});
//delete user
app.get("/delete/:id", (req, res) => {
  userModel
    .findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/users/list"))
    .catch((err) => {
      res.sendStatus(400).send("not found!");
    });
});

module.exports = app;
