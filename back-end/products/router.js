const express = require("express");
const {
  createProduct,
  updateProduct,
  listOfProducts,
  getProduct,
} = require("./controller");

const productRouter = express.Router();

productRouter
  .post("/create", createProduct)
  .put("/edit/:id", updateProduct)
  .get("/list", listOfProducts)
  .get("/get/:id", getProduct);

module.exports = { productRouter };
