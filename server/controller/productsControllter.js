const productModel = require("../models/ProductModel");

const express = require("express");
const productRoute = express.Router();

productRoute.get("/getAll", async (req, res) => {
  const products = await productModel.find({});
  res.json(products);
});
productRoute.get("/:id", (req, res) => {
  productModel
    .findById({ _id: req.params.id })
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});
module.exports = productRoute;
