const express = require("express");
const {
  createCategory,
  updateCategory,
  listOfCategory,
  getCategory,
} = require("./controller");

const categoryRouter = express.Router();

categoryRouter
  .post("/create", createCategory)
  .put("/edit/:id", updateCategory)
  .get("/list", listOfCategory)
  .get("/get/:id", getCategory);

module.exports = { categoryRouter };
