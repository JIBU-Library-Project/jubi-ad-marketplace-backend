const swaggerAutogen = require("swagger-autogen")();
const doc = {
  info: {
    title: "Advertisement App API",
    description:
      "An API that allows users access advertisements and allows vendors make neccessary modifications to their adverts.",
  },
  host: "https://jubi-ad-marketplace-backend.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger-output.json";
const routes = ["./routes/auth.route.js"];

swaggerAutogen(outputFile, routes, doc);
