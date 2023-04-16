const express = require("express");
const productModel = require("../models/ProductModel");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
//
const cloudinary = require("cloudinary").v2;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
//upload image for product
// Configuration
cloudinary.config({
  cloud_name: "dq1ojjdde",
  api_key: "418354474777134",
  api_secret: "bZ1PT7qyKY13ner2rxWv2CS8rfw",
});
//get web
app.get("/list", (req, res) => {
  productModel.find({}).then((products) => {
    res.render("products/listPs", {
      products: products.map((product) => product.toJSON()),
    });
  });
});
app.get("/add", (req, res) => {
  res.render("products/addP");
});
app.get("/cart", (req, res) => {
  res.render("products/cartP");
});
//add
const addproduct = (file, req, res) => {
  let rate = req.body.rating ? req.body.rating : 0;
  let price = req.body.price ? req.body.price : 0;
  const pd = new productModel({
    name: req.body.name,
    image: file,
    rating: parseFloat(rate),
    price: parseInt(price),
    description: req.body.description,
    countInStock: parseInt(req.body.countInStock),
  });
  try {
    pd.save().then(() => {
      console.log(pd);
      res.render("products/addP", {
        viewTitle: "Thêm mới thành công!",
      });
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
const updateproduct = (file, req, res) => {
  //Tìm product
  productModel
    .findById(req.body.id)
    .then((product) => {
      //upload hình ảnh
      file = file ? file : product.image;
      productModel.updateOne(
        { _id: product._id },
        {
          name: req.body.name,
          image: file,
          rating: parseFloat(req.body.rating),
          price: parseInt(req.body.price),
          description: req.body.description,
          countInStock: parseInt(req.body.countInStock),
        },
        {
          new: true,
          upsert: true,
        }
      );
    })
    .then(() => {
      res.redirect("/products/list");
    })
    .catch((err) => console.log(err.message));
};

//add product
app.post("/add", (req, res) => {
  if (!req.files) {
    if (req.body.id == "") {
      addproduct("", req, res);
    } else {
      updateproduct("", req, res);
    }
  } else {
    const file = req.files.image;
    cloudinary.uploader.upload(
      file.tempFilePath,
      { folder: "TCdesk/product" },
      (err, result) => {
        if (err) {
          return res.send(err.message);
        }
        if (req.body.id == "") {
          addproduct(result.url, req, res);
        } else {
          updateproduct(result.url, req, res);
        }
      }
    );
  }
});
//update product
app.get("/edit/:id", (req, res) => {
  productModel
    .findOne({ _id: req.params.id })
    .then((product) => {
      if (product) {
        res.render("products/addP", {
          viewTitle: "Cập nhật thông tin",
          product: product.toJSON(),
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(400, "Bad Request");
    });
});
//delete product
app.get("/delete/:id", (req, res) => {
  productModel
    .findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/products/list"))
    .catch((err) => {
      res.sendStatus(400).send("not found!");
    });
});
module.exports = app;
