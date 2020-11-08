const express = require("express");
const router = require("./routes/product");
const userRouter = require("./routes/user");
const cartRouter = require("./routes/cart");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const nocache = require("nocache");

require("./config/passport")(passport);
require("dotenv").config();
const db = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const app = express();

app.use(nocache());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("etag", false);

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = require("express-messages")(req, res);
  next();
});
app.get("/", (req, res) => res.redirect("products"));
app.use("/products", router);
app.use("/user", userRouter);
app.use("/cart", cartRouter);

app.use((req, res, next) => {
  const error = new Error("404 - Not found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  if (err.error === "wrong extension") {
    req.flash("error", err.message);
    res.json("back");
  }
  const status = res.status(err.status || 500);

  if (status.statusCode === 500) err = "Interval Server Error";

  res.render("error", { error: err });
});
app.listen(process.env.PORT || 3000);
