var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var { connectDB } = require("./src/config/database");

// Routes
var indexRouter = require("./src/routes/index");
var usersRouter = require("./src/routes/users");

var app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;
console.log("process env PORT:", port);

// view engine setup
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

console.log("Connecting to database...");
connectDB()
  .then(() => {
    console.log("Database connected successfully");
    console.log("Starting server...");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error starting server:", err);
  });

module.exports = app;
