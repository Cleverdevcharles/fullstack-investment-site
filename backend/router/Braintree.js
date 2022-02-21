const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/Auth");
const { userById } = require("../controllers/User");
const { generateToken, processPayment } = require("../controllers/Braintree");

router.get("/braintree/getToken/:userId", requireSignin, isAuth, generateToken);
router.post(
  "/braintree/payment/:userId",
  requireSignin,
  isAuth,
  processPayment
);

router.param("userId", userById);

module.exports = router;
