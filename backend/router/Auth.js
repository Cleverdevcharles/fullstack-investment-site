const express = require("express");
const router = express.Router();

// Load Controllers
const {
    signup,
    signin,
    signout,
    verified,
    forgotPassword,
    changePassword,
    resetPassword,
} = require("../controllers/Auth")


const {
    validSignup,
    validSignin,
    forgotPasswordValidator,
    changePasswordValidator,
    resetPasswordValidator,
} = require("../helpers/valid")



router.post("/register", validSignup, signup);
router.post("/login", validSignin, signin);
router.post("/verified", verified);
router.get("/signout", signout);


// forgot reset password
router.put("/forgotpassword", forgotPasswordValidator, forgotPassword);
router.put("/changepassword", changePasswordValidator, changePassword);
router.put("/resetpassword", resetPasswordValidator, resetPassword);

module.exports = router;
