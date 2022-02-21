const InvestmentPackage = require("../models/InvestmentPackage");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.investmentpackageById = (req, res, next, id) => {
  InvestmentPackage.findById(id).exec((err, investmentpackage) => {
    if (err || !investmentpackage) {
      return res.status(400).json({
        error: "InvestmentPackage does not exist",
      });
    }
    req.investmentpackage = investmentpackage;
    next();
  });
};

exports.create = (req, res) => {
  const investmentpackage = new InvestmentPackage(req.body);
  investmentpackage.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.investmentpackage);
};

exports.update = (req, res) => {
  console.log("req.body", req.body);
  console.log("investmentpackage update param", req.params.investmentpackageId);

  const investmentpackage = req.investmentpackage;
  investmentpackage.name = req.body.name;
  investmentpackage.minimum_amount = req.body.minimum_amount;
  investmentpackage.maximum_amount = req.body.maximum_amount;
  investmentpackage.percentage_interest = req.body.percentage_interest;
  investmentpackage.withdrawalDate = req.body.withdrawalDate;
  investmentpackage.duration = req.body.duration
  investmentpackage.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const investmentpackage = req.investmentpackage;
  investmentpackage.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: `Investment Package "${investmentpackage.name}" deleted successfully.`,
    });
  });
};

exports.list = (req, res) => {
  InvestmentPackage.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.decreaseAmount = (req, res, next) => {
  let bulkOps = req.body.order.investmentpackages.map((package) => {
    return {
      updateOne: {
        filter: { _id: package._id },
        update: { $inc: { amount: -package.count, sold: +package.count } },
      },
    };
  });

  InvestmentPackage.bulkWrite(bulkOps, {}, (error, investmentpackage) => {
    if (error) {
      return res.status(400).json({
        error: "Could not update amount.",
      });
    }
    next();
  });
};

