// Creaing token and saving cookie
const sendLoginToken = (newUser, statusCode, res) => {
  const token = newUser.getJWTToken();

  // Options for cookie
  const options = {
    expires: new Date(Date.now + process.env.COOKIE_EXPIRE * 24 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    status: "SUCCESS",
    message: "Signin successful.",
    user: newUser,
    token,
  });
};

module.exports = sendLoginToken;
