const { Router } = require("express");
const {
  signUp,
  signIn,
  protectedRoute,
} = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares/auth.middleware");

const router = Router();

router.post("/api/signup", signUp);

router.post("/api/signin", signIn);

router.get("/api/protected", authenticate, protectedRoute);

module.exports = router;
