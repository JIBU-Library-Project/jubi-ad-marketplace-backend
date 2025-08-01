const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const responseHandler = require("./middlewares/responseHandler.middleware");
const errorHandler = require("./middlewares/errorHandler.middleware");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/ad.route");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const sendEmail = require("./utils/sendEmail.util");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.set("trust proxy", true);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(responseHandler);

app.use("/", authRoutes);

app.use("/", userRoutes);

// app.post("/test-email", async(req,res)=>{
//     const {email, name, role} = req.body;
//     await sendEmail(email, name, role);
//     res.json({
//         message: "Sent successfully"
//     });

// })

app.use(errorHandler);

module.exports = app;
