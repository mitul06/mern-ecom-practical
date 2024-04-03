const express = require("express");
const {
  createBrand,
  updateBrand,
  listOfBrands,
  getBrand,
} = require("./controller");

const brandRouter = express.Router();

brandRouter
  .post("/create", createBrand)
  .put("/edit/:id", updateBrand)
  .get("/list", listOfBrands)
  .get("/get/:id", getBrand);

module.exports = { brandRouter };
