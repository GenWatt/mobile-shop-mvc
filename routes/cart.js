const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const cartController = require("../controllers/cart");

router.post("/", ensureAuthenticated, (req, res, next) => {
  cartController.cart_post(req, res, next);
});

router.put("/", ensureAuthenticated, (req, res, next) => {
  cartController.cart_put(req, res, next);
});

router.delete("/:id", ensureAuthenticated, (req, res, next) => {
  cartController.cart_delete(req, res, next);
});

router.get("/", ensureAuthenticated, (req, res, next) => {
  cartController.cart_get(req, res, next);
});

module.exports = router;
