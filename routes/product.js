const express = require("express");
const multer = require("multer");
const productsController = require("../controllers/products");
const multerConf = require("../config/multer");
const router = express.Router();

const { ensureAuthenticated, isAdmin } = require("../config/auth");

router.get("/", ensureAuthenticated, (req, res, next) => {
  productsController.products_get(req, res, next);
});

router
  .get("/add", isAdmin, (req, res, next) => {
    productsController.product_admin_add_get(req, res, next);
  })
  .post("/update/:id", isAdmin, multer(multerConf).single("img"), (req, res, next) => {
    productsController.product_admin_update_post(req, res, next);
  })
  .get("/update/:id", isAdmin, (req, res, next) => {
    productsController.product_admin_get(req, res, next);
  })
  .post("/add", isAdmin, multer(multerConf).single("img"), (req, res, next) => {
    productsController.product_admin_add_post(req, res, next);
  })
  .delete("/:id", isAdmin, (req, res, next) => {
    productsController.product_admin_delete(req, res, next);
  });

router.get("/:id", ensureAuthenticated, (req, res, next) => {
  productsController.product_get(req, res, next);
});

module.exports = router;
