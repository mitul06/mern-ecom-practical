const express = require("express");
const {
  updateUser,
  changePasswordUser,
  userList,
  getUser,
  createUser,
} = require("./controller");
const { isAuthenticated } = require("../middlewares/passport");

const userRouter = express.Router();

userRouter
  .post("/create", createUser)
  .put("/edit/:id", isAuthenticated, updateUser)
  .put("/change-password/:id", isAuthenticated, changePasswordUser)
  .get("/list", isAuthenticated, userList)
  .get("/get/:id", isAuthenticated, getUser);

module.exports = { userRouter };
