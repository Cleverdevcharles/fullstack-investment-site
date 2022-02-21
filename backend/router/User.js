const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/Auth");
const {
  userById,
  read,
  update,
  investmentHistory,
  list,
} = require("../controllers/User");

router.get("/secret", requireSignin, (req, res) => {
  res.json({
    user: "Got here yay",
  });
});

router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/user/update/:userId", requireSignin, isAuth, update);
router.get("/orders/by/user/:userId", requireSignin, isAuth, investmentHistory);
router.get("/users", list);
router.param("userId", userById);

module.exports = router;
