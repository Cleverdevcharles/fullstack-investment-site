const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Product's Name."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please Enter Product's Description."],
    },
    price: {
      type: Number,
      required: [true, "Please Enter Product's Price."],
      maxLength: [8, "Price can not 8 characters"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          require: true,
        },
        url: {
          type: String,
          require: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please Enter Product's Category."],
    },
    stock: {
      type: Number,
      required: [true, "Please Enter Product's Stock."],
      maxLength: [4, "Stock cannot exceed a characters"],
    },
    shipping: {
      required: false,
      type: Boolean,
    },
    shipping_fee: {
      type: Number,
      trim: true,
      maxlength: 32,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const product = mongoose.model("Product", productSchema);

module.exports = product;
