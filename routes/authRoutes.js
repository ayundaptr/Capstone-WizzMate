const express = require("express");
const {
  register,
  login,
  googleLogin,
} = require("../controller/authController");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/google-login", googleLogin);

module.exports = router;
