const { Router } = require("express");
const router = Router();
const userController = require("../controllers/user");

router.get("/login", (req, res) => {
  userController.login_get(req, res);
});

router.get("/register", (req, res) => {
  userController.register_get(req, res);
});

router.post("/register", (req, res) => {
  userController.register_post(req, res);
});

router.get("/logout", (req, res) => {
  userController.log_out_get(req, res);
});

router.post("/login", (req, res, next) => userController.login_post(req, res, next));

module.exports = router;
