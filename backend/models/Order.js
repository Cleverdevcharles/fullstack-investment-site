const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const CartItemSchema = new mongoose.Schema(
  {
    investmentpackage: { type: ObjectId, ref: "InvestmentPackage" },
    name: String,
    price: Number,
    count: Number,
    duration: Number,
    withdrawalDate: String,
    percentage_interest: Number,
  },
  { timestamps: true }
);

const CartItem = mongoose.model("CartItem", CartItemSchema);

const OrderSchema = new mongoose.Schema(
  {
    investmentpackages: [CartItemSchema],
    transaction_id: {},
    transaction_hash: {},
    currency_option: {},
    investor: {},
    amount: { type: Number },
    status: {
      type: String,
      default: "Not Verified",
      enum: [
        "Not Verified",
        "Verified",
        "Processing",
        "Paid",
        "Cancelled",
      ],
    },
    updated: Date,
    user: { type: ObjectId, ref: "User" },
    withdrawalDate: String,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, CartItem };
