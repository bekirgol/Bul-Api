const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Database Connect
const db = require("./helper/db")();
const config = require("./config");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const lostItemsRouter = require("./routes/lost_items");
const foundItemsRouter = require("./routes/found_items");

const app = express();

// Config
app.set("api_secret_key", config.api_secret_key);

//Middleware
const authendicate = require("./Middleware/authendicate");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/upload", express.static("upload"));

app.use("/", indexRouter);
app.use("/users", usersRouter);
// app.use("/api", authendicate);
app.use("/lostitems", lostItemsRouter);
app.use("/founditems", foundItemsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
