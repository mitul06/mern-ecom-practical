const express = require("express");
const {
  createOrder,
  updateOrder,
  listOfOrders,
  getOrder,
} = require("./controller");

const orderRouter = express.Router();

orderRouter
  .post("/create", createOrder)
  .put("/edit/:id", updateOrder)
  .get("/list", listOfOrders)
  .get("/get/:id", getOrder);

module.exports = { orderRouter };
