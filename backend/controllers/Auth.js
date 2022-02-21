const User = require("../models/User");
const nodemailer = require("nodemailer");
const expressJwt = require("express-jwt");
const { validationResult } = require("express-validator");
const { errorHandler } = require("../helpers/dbErrorHandler");
const jwt = require("jsonwebtoken");

// Env Variables
require("dotenv").config();

// Nodemailer
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

// Testing transporter
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for Message : ", success);
  }
});

// Signup
exports.signup = (req, res) => {
  let {
    firstName,
    lastName,
    fullName,
    email,
    phone,
    state,
    country,
    password,
    referralCode,
    isBanned,
    usdt_address,
  } = req.body;
  fullName = firstName.trim() + " " + lastName.trim();
  const strongRegexSpecialCharacter = /^(.*\W).*$/;
  const strongRegexHighercase = new RegExp("^(?=.*[A-Z])");
  const strongRegexLowercase = new RegExp("^(?=.*[a-z])");
  const strongRegexNumber = new RegExp("^(?=.*[0-9])");
  const errors = validationResult(req);

  if (
    firstName == "" ||
    lastName == "" ||
    email == "" ||
    phone == "" ||
    state == "" ||
    country == "" ||
    password == "" ||
    usdt_address == ""
  ) {
    res.json({
      status: "FAILED",
      message: "All fields are required.",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: "FAILED",
      message: "Your email is badly formatted.",
    });
  } else if (strongRegexSpecialCharacter.test(firstName)) {
    res.json({
      status: "FAILED",
      message: "First name can't contain any special character or space.",
    });
  } else if (strongRegexSpecialCharacter.test(lastName)) {
    res.json({
      status: "FAILED",
      message: "Last name can't contain any special character or space.",
    });
  } else if (password.length < 8) {
    res.json({
      status: "FAILED",
      message: "Password too short, must be at least 8 characters long.",
    });
  } else if (password.length > 32) {
    res.json({
      status: "FAILED",
      message: "Password must be between 8 to 32 characters long only.",
    });
  } else if (!strongRegexHighercase.test(password)) {
    res.json({
      status: "FAILED",
      message: "Password must contain at least an uppercase.",
    });
  } else if (!strongRegexLowercase.test(password)) {
    res.json({
      status: "FAILED",
      message: "Password must contain at least a lowercase.",
    });
  } else if (!strongRegexNumber.test(password)) {
    res.json({
      status: "FAILED",
      message: "Password must contain at least one number.",
    });
  } else if (!strongRegexSpecialCharacter.test(password)) {
    res.json({
      status: "FAILED",
      message: "Password must contain at least one special character.",
    });
  } else if (isBanned) {
    res.json({
      status: "FAILED",
      message:
        "Account with this email already exist and has been banned!!! Please contact support.",
    });
  } else if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    res.json({
      status: false,
      errors: firstError,
    });
  } else {
    User.findOne({ email }).exec((err, result) => {
      if (result) {
        return res.status(400).json({
          status: "FAILED",
          errors: "Account with this email already exits.",
        });
      }
      if (err) {
        return res.json({
          status: "FAILED",
          message: "An error occured while checking for existing user!!!",
        });
      }

      // sendVerficationEmail(user);
      const token = jwt.sign(
        {
          firstName,
          lastName,
          fullName,
          email,
          phone,
          state,
          country,
          avatar: {
            public_id: "null",
            url: "null",
          },
          password,
          usdt_address,
          verified: false,
          referralCode:
            usdt_address.slice(20, 30) +
            password.slice(10, 20) +
            firstName.slice(2, 4),
        },
        process.env.JWT_ACCOUNT_ACTIVATION,
        {
          expiresIn: "15m",
        }
      );
      const verifyAccountUrl =
        process.env.CLIENT_URL + "/user-account-verify-" + token;

      // Mail Option
      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify Your Email",
        html: `<!DOCTYPE html>
<html>

<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
        @media screen {
            @font-face {
                font-family: 'Lato';
                font-style: normal;
                font-weight: 400;
                src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
            }

            @font-face {
                font-family: 'Lato';
                font-style: normal;
                font-weight: 700;
                src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
            }

            @font-face {
                font-family: 'Lato';
                font-style: italic;
                font-weight: 400;
                src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
            }

            @font-face {
                font-family: 'Lato';
                font-style: italic;
                font-weight: 700;
                src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
            }
        }

        /* CLIENT-SPECIFIC STYLES */
        body,
        table,
        td,
        a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            -ms-interpolation-mode: bicubic;
        }

        /* RESET STYLES */
        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        table {
            border-collapse: collapse !important;
        }

        body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
        }

        /* iOS BLUE LINKS */
        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        /* MOBILE STYLES */
        @media screen and (max-width:600px) {
            h1 {
                font-size: 32px !important;
                line-height: 32px !important;
            }
        }

        /* ANDROID CENTER FIX */
        div[style*="margin: 16px 0;"] {
            margin: 0 !important;
        }
    </style>
</head>

<body style="background-color: #e1e1e1; margin: 0 !important; padding: 0 !important;">
    <!-- HIDDEN PREHEADER TEXT -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <!-- LOGO -->
        <tr>
            <td bgcolor="#1746e0" align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#1746e0" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                            <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#e1e1e1" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                        <table border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="center" style="border-radius: 3px;" bgcolor="#1746e0"><a href=${verifyAccountUrl} target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #1746e0; display: inline-block;">Confirm Account</a></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr> 
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;">If you have any questions, just reply to this email—we're always happy to help out.</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;">Cheers ❤️</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#e1e1e1" align="center" style="padding: 30px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more help?</h2>
                            <p style="margin: 0;"><a href="#" target="_blank" style="color: #1746e0;">We&rsquo;re here to help you out</a></p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
    `,
      };

      transporter
        .sendMail(mailOptions)
        .then((sent) => {
          return res.json({
            status: "PENDING",
            message: `Email has been sent to ${email}. kindly activate your account.`,
            token: token,
          });
        })
        .catch((error) => {
          console.log(error);
          res.json({
            status: "FAILED",
            message: "Email verification failed",
            error: error,
          });
        });
    });
  }
};

// Verify email
exports.verified = (req, res) => {
  const { token } = req.body;
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
      if (err) {
        res.status(401).json({
          status: "FAILED",
          errors: "Expired link. Signup again",
        });
      } else {
        const {
          firstName,
          lastName,
          fullName,
          email,
          phone,
          state,
          country,
          avatar: { public_id, url },
          password,
          usdt_address,
          verified,
          referralCode,
        } = jwt.decode(token);

        const newUser = new User({
          firstName,
          lastName,
          fullName,
          email,
          phone,
          state,
          country,
          avatar: {
            public_id,
            url,
          },
          password,
          usdt_address,
          verified: true,
          referralCode:
            usdt_address.slice(20, 30) +
            password.slice(10, 20) +
            firstName.slice(2, 4),
        });

        newUser.save((err, result) => {
          if (err) {
            console.log("Save error : ", err);
            return res.status(401).json({
              status: "FAILED",
              errors: err,
            });
          } else {
            return res.json({
              status: "SUCCESS",
              message: "Account activated Successfull. You can now signin.",
              user: result,
            });
          }
        });

        // res.sendFile(path.join(__dirname, "./../views/verified.html"));
      }
    });
  } else {
    return res.json({
      status: "FAILED",
      message: "Error happening please try again",
      Error: errorHandler(err),
    });
  }
};

// Verified Parameters
// exports.verified = (req, res) => {
//   res.sendFile(path.join(__dirname, "./../views/verified.html"));
// };

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    console.log(firstError);
    return res.status(422).json({
      status: "FAILED",
      errors: firstError,
    });
  } else {
    // check if user exist
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        console.log(err);
        return res.status(400).json({
          status: "FAILED",
          error: "User with that email does not exist. Please signup",
        });
      }
      // if user is found make sure the email and password match
      // create authenticate method in user model
      if (!user.authenticate(password)) {
        return res.status(401).json({
          status: "FAILED",
          error: "Email and password don't match",
        });
      }
      // generate a signed token with user id and secret
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      // persist the token as 't' in cookie with expiry date
      res.cookie("t", token, { expire: new Date() + 9999 });
      // return response with user and token to frontend client
      const { _id, fullName, email, role } = user;
      return res.json({ token, user: { _id, email, fullName, role } });
    });
  }
};

// req.user._id
exports.requireSignin = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

exports.adminMiddleware = (req, res, next) => {
  User.findById({
    _id: req.user._id,
  }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    if (user.role !== "Admin") {
      return res.status(400).json({
        error: "Admin resource. Access denied.",
      });
    }

    req.profile = user;
    next();
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied!!!",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role !== "Admin") {
    return res.status(403).json({
      error: "Admin resourse! Access denied",
    });
  }
  next();
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    User.findOne(
      {
        email,
      },
      (err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: "User with that email does not exist",
          });
        }

        const token = jwt.sign(
          {
            _id: user._id,
          },
          process.env.JWT_RESET_PASSWORD,
          {
            expiresIn: "15m",
          }
        );

        const forgotPasswordUrl =
          process.env.CLIENT_URL + "/users-password-reset-" + token;

        const forgotPasswordOption = {
          from: process.env.AUTH_EMAIL,
          to: email,
          subject: `Password Reset`,
          html: `
          <div style="border: 1px solid #000 ; border-radius: 10px; padding: 20px;">
            <br />
            <div class="card-header">
            <h1 style="color: #000000; text-align: center;"><b>Password Reset</b></h1>
            </div>
            <hr />
            <br />
            <div class="card-body">
              <h2 class="card-title" style="text-align: center; color: #000;">
              Hello <span style="color: #4169E1">${email}</span>, We received a request to reset your password.
              </h2>
                <p>Click on change password to reset your password.</p>
              <h3 class="card-text" style="text-align: center; color: #000;">
                By clicking on <b style="color: #4169E1;">Change Password</b>,
                you are accepting to change your previous password to a new one.
                This new password you are about to create will be used as
                your password while trying to signin.
              </h3>
              <center style="border-radius: 10px;"><a href="${forgotPasswordUrl}" style="
              border: none;
              outline: 0;
              display: inline-block;
              padding: 15px;
              border-radius: 10px;
              color: #ffffff;
              background-color: #4169E1;
              text-align: center;
              cursor: pointer;
              font-size: 18px;
          "><b>Change Password</b></a></center>
          <br />
          <hr />
          <p>This message was sent to ${email} at your request. ❤️</p>
          </div>
          </div>`,
        };

        return user.updateOne(
          {
            resetPasswordLink: token,
          },
          (err, success) => {
            if (err) {
              console.log("RESET PASSWORD LINK ERROR", err);
              return res.status(400).json({
                error:
                  "Database connection error on user password forgot request",
              });
            } else {
              transporter
                .sendMail(forgotPasswordOption)
                .then((sent) => {
                  console.log(sent);
                  return res.json({
                    status: "PENDING",
                    message: `Email has been sent to ${email}. Follow the steps to change your password.`,
                  });
                })
                .catch((error) => {
                  console.log(error);
                  res.json({
                    status: "FAILED",
                    message: "Error sending forgot password link.",
                    error: error,
                  });
                });
            }
          }
        );
      }
    );
  }
};

exports.changePassword = (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    User.findOne(
      {
        email,
      },
      (err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: "User with that email does not exist",
          });
        }

        const token = jwt.sign(
          {
            _id: user._id,
          },
          process.env.JWT_RESET_PASSWORD,
          {
            expiresIn: "15m",
          }
        );

        const changePasswordUrl =
          process.env.CLIENT_URL + "/user/account/verify/" + token;

        const changePasswordOption = {
          from: process.env.AUTH_EMAIL,
          to: email,
          subject: `Password Reset`,
          html: `
          <div style="border: 1px solid #000 ; border-radius: 10px; padding: 20px;">
            <br />
            <div class="card-header">
            <h1 style="color: #000000; text-align: center;"><b>Password Reset</b></h1>
            </div>
            <hr />
            <br />
            <div class="card-body">
              <h2 class="card-title" style="text-align: center; color: #000;">
              Hello <span style="color: #4169E1">${email}</span>, We received a request to reset your password.
              </h2>
                <p>Click on change password to reset your password.</p>
              <h3 class="card-text" style="text-align: center; color: #000;">
                By clicking on <b style="color: #4169E1;">Change Password</b>,
                you are accepting to change your previous password to a new one.
                This new password you are about to create will be used as
                your password while trying to signin.
              </h3>
              <center style="border-radius: 10px;"><a href="${changePasswordUrl}" style="
              border: none;
              outline: 0;
              display: inline-block;
              padding: 15px;
              border-radius: 10px;
              color: #ffffff;
              background-color: #4169E1;
              text-align: center;
              cursor: pointer;
              font-size: 18px;
          "><b>Change Password</b></a></center>
          <br />
          <hr />
          <p>This message was sent to ${email} at your request. ❤️</p>
          </div>
          </div>`,
        };

        return user.updateOne(
          {
            resetPasswordLink: token,
          },
          (err, success) => {
            if (err) {
              console.log("RESET PASSWORD LINK ERROR", err);
              return res.status(400).json({
                error:
                  "Database connection error on user password forgot request",
              });
            } else {
              transporter
                .sendMail(changePasswordOption)
                .then((sent) => {
                  console.log(sent);
                  return res.json({
                    status: "PENDING",
                    message: `Email has been sent to ${email}. Follow the steps to change your password.`,
                  });
                })
                .catch((error) => {
                  console.log(error);
                  res.json({
                    status: "FAILED",
                    message: "Error ending change password link.",
                    error: error,
                  });
                });
            }
          }
        );
      }
    );
  }
};

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    if (resetPasswordLink) {
      jwt.verify(
        resetPasswordLink,
        process.env.JWT_RESET_PASSWORD,
        function (err, decoded) {
          if (err) {
            return res.status(400).json({
              error: "Expired link. Try again",
            });
          }

          User.findOne(
            {
              resetPasswordLink,
            },
            (err, user) => {
              if (err || !user) {
                return res.status(400).json({
                  error: "Something went wrong. Try later",
                });
              }

              const updatedFields = {
                password: newPassword,
                resetPasswordLink: "",
              };

              user = _.extend(user, updatedFields);

              user.save((err, result) => {
                if (err) {
                  return res.status(400).json({
                    error: "Error resetting user password",
                  });
                }
                res.json({
                  message: `Great! Now you can login with your new password`,
                });
              });
            }
          );
        }
      );
    }
  }
};
