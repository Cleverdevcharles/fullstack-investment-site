const mongoose = require("mongoose");

const InvestmentPackageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
    minimum_amount: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    maximum_amount: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    price: {
        type: Number,
      trim: true,
      default : 0,
      maxlength: 32,
    },
    percentage_interest: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    duration: {
      type: Number,
      enum: [7, 30],
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InvestmentPackage", InvestmentPackageSchema);
