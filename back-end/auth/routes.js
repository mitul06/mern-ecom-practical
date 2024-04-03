const express = require("express");
const { register, login, isLoggedIn, logout } = require("./controller");
const { isAuthenticated } = require("../middlewares/passport");
const authRoutes = express.Router();

authRoutes
  .post("/register", register)
  .post("/login", login)
  .get("/isLoggedIn", isAuthenticated, isLoggedIn)
  .get("/logout", isAuthenticated, logout);

module.exports = { authRoutes };
