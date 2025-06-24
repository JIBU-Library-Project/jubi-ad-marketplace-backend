const { Router } = require("express");
const { signUp, signIn } = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares/auth.middleware");

const router = Router();

router.post("/api/signup", signUp);

router.post("/api/signin", signIn);

module.exports = router;
