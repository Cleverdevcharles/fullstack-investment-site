const express = require("express");
const router = express.Router();

const {
  create,
  investmentpackageById,
  read,
  update,
  remove,
  list,
} = require("../controllers/InvestmentPackage");
const { requireSignin, isAuth, isAdmin } = require("../controllers/Auth");
const { userById } = require("../controllers/User");

router.get("/investmentpackage/:investmentpackageId", read);
router.post(
  "/investmentpackage/create/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  create
);
router.put(
  "/investmentpackage/update/:investmentpackageId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.delete(
  "/investmentpackage/:investmentpackageId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.get("/investmentpackages", list);
router.param("investmentpackageId", investmentpackageById);
router.param("userId", userById);

module.exports = router;
