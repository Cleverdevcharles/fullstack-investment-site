const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource.", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);
  console.log(req.user);
  next();
});

// exports.authorizedRoles = (...roles) => {
//   return catchAsyncErrors((req, res, next) => {
//     console.log(req.user); // This is where the error is coming from (It returns req.user as null despite succesful)
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new ErrorHandler(
//           `Role: ${req.user.role} is not allowed to access this resource.`,
//           403
//         )
//       );
//     }
//     next();
//   });
// };

exports.authorizedRoles = (data, res, next) => {
  if (data[0].role !== "Admin") {
    return res.status(403).json({
      error: "Admin resourse! Access denied",
    });
  }
  next();
};
