// Mongoose
const mongoose = require("mongoose");
// JSONWEBTOKEN
// const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true, required: true, maxlength: 32 },
    lastName: { type: String, trim: true, required: true, maxlength: 32 },
    fullName: { type: String, trim: true, maxlength: 32 },
    email: { type: String, trim: true, required: true, unique: true },
    state: { type: "String", trim: true, required: true },
    country: { type: "String", trim: true, required: true },
    phone: { type: "String", trim: true, required: true, unique: false },
    hashed_password: { type: String, required: true },
    salt: String,
    referralCode: { type: String, trim: true, unique: true },
    role: { type: String, default: "Subscriber" },
    about: { type: String, trim: true },
    avatar: [
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
    resetPasswordLink: {
      data: String,
      default: "",
    },
    changePasswordLink: {
      data: String,
      default: "",
    },
    history: { type: Array, default: [] },
    paymentOption: { type: Array, default: [] },
    paymentData: { type: Array, default: [] },
    verified: { type: Boolean, unique: false },
    isBanned: {
      type: String,
      default: false,
    },
    usdt_address: {
      type: String,
      trim: true,
    },
    startedAt: { type: Date },
    endedAt: { type: Date },
  },
  { timestamps: true }
);

// virtual field
UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
