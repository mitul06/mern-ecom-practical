const express = require("express");
const dotenv = require("dotenv");
const { appServer } = require("./configs/appServer");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const DB_URL = process.env.DB_URL;

appServer(app, PORT, DB_URL);
