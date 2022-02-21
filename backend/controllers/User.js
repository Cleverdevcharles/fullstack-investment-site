const User = require("../models/User");
const { Order } = require("../models/Order");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      // console.log(err);
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  console.log(req.profile);
  return res.json(req.profile);
};

exports.update = (req, res) => {
  // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
  const {
    firstName,
    lastName,
    fullName,
    email,
    phone,
    state,
    country,
    password,
    usdt_address,
  } = req.body;

  User.findOne({ _id: req.profile._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    if (!fullName) {
      return res.status(400).json({
        error: "Full name is required",
      });
    } else {
      user.fullName = fullName;
    }
    if (!phone) {
      return res.status(400).json({
        error: "Phone number is required",
      });
    } else {
      user.phone = phone;
    }
    if (!usdt_address) {
      return res.status(400).json({
        error: "USDT address is required",
      });
    } else {
      user.usdt_address = usdt_address;
    }
    if (!country) {
      return res.status(400).json({
        error: "Country is required",
      });
    } else {
      user.country = country;
    }
    if (!state) {
      return res.status(400).json({
        error: "State is required",
      });
    } else {
      user.state = state;
    }

    if (password) {
      if (password.length < 8) {
        return res.status(400).json({
          error: "Password should be min 8 characters long.",
        });
      } else {
        user.password = password;
      }
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.fullName = firstName.trim() + " " + lastName.trim();

    user.save((err, updatedUser) => {
      if (err) {
        console.log("USER UPDATE ERROR", err);
        return res.status(400).json({
          error: "User update failed",
        });
      }
      updatedUser.hashed_password = undefined;
      updatedUser.salt = undefined;
      res.json(updatedUser);
    });
  });
};

exports.list = (req, res) => {
  User.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.addOrderToUserHistory = (req, res, next) => {
  let history = [];

  req.body.order.investmentpackages.forEach((item) => {
    history.push({
      _id: item._id,
      name: item.name,
      percentage_interest: item.percentage_interest,
      duration: item.duration,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount,
    });
  });

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { history: history } },
    { new: true },
    (error, data) => {
      if (error) {
        return res.status(400).json({
          error: "Could not update user investment history",
        });
      }
      next();
    }
  );
};

exports.investmentHistory = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id fullName usdt_address")
    .sort("-created")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(orders);
    });
};
