const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const responseHandler = require("./middlewares/responseHandler.middleware");
const errorHandler = require("./middlewares/errorHandler.middleware");
const authRoutes = require("./routes/auth.route");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.set("trust proxy", true);

app.use(responseHandler);

app.use("/", authRoutes);

app.use(errorHandler);

module.exports = app;
