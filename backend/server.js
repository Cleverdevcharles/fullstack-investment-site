const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorMiddleware = require("./middleWare/error");
const port = process.env.PORT || 8000;

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception.`);

  server.close(() => {
    process.exit(1);
  });
});

// Routes
const authRoutes = require("./router/Auth");
const userRoutes = require("./router/User");
const investmentpackageRoutes = require("./router/InvestmentPackage");
const braintreeRoutes = require("./router/Braintree");
const orderRoutes = require("./router/Order");
const siteRoutes = require("./router/Site");

// MongoDB
require("./config/database");

// MIDDELWARES
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );
  app.use(morgan("dev"));
}

// For accepting post from data
app.use(express.json({ limit: "2mb" }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(cookieParser());

app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", investmentpackageRoutes);
app.use("/api/v1", braintreeRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", siteRoutes);

// Middleware for error
app.use(errorMiddleware);
app.use((req, res, next) => {
  res.status(404).send(`<h1>Opps!!! PAGE NOT FOUND</h1>`);
});

const server = app.listen(port, () => {
  console.log(`Server Connected : http://localhost:${port}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection.`);

  server.close(() => {
    process.exit(1);
  });
});
