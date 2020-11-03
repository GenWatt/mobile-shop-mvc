const Product = require("../modules/Product");
const Cart = require("../modules/Cart");
const controller = require("./user");
const mongoose = require("mongoose");
const fs = require("fs");

module.exports.products_get = async (req, res, next) => {
  const { login, id, admin } = req.user;

  try {
    const data = await Product.find({});
    const cart = await Cart.find({ user: id });
    let count = 0;

    cart.forEach(({ quantity }) => (count += quantity));
    if (admin) res.render("products_admin", { products: data, login, count, admin });
    else res.render("products", { products: data, login, count, admin });
  } catch (error) {
    next(error);
  }
};

module.exports.product_get = async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (product) res.render("product", { product });
    else {
      req.flash("error", "No item in database");
      res.redirect("/products");
    }
  } catch (error) {
    next(error);
  }
};

module.exports.product_admin_add_get = async (req, res, next) => {
  res.render("addProduct", { product: null });
};

module.exports.product_admin_get = async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });

    if (product) res.render("addProduct", { product });
  } catch (error) {
    next(error);
  }
};

module.exports.product_admin_add_post = async (req, res, next) => {
  const { phone, description, brand, img, price, ram, storage, processor } = req.body;
  const newProduct = {
    phone,
    description,
    img,
    brand,
    price,
    _id: mongoose.Types.ObjectId(),
    specification: { ram, storage, processor },
  };

  try {
    await Product.create(newProduct);

    req.flash("success", "Product added");
    res.redirect("back");
  } catch (err) {
    const error = controller.handleErrors(err);

    req.flash("error", error);
    res.redirect("back");
  }
};

module.exports.product_admin_update_post = async (req, res, next) => {
  const { phone, description, brand, img, price, storage, ram, processor } = req.body;
  const newProduct = {
    phone,
    description,
    brand,
    price,
    specification: {
      storage,
      ram,
      processor,
    },
  };
  if (img) newProduct.img = img;

  try {
    await Product.findOneAndUpdate({ _id: req.params.id }, newProduct);

    req.flash("success", "Product Updated!");
    res.redirect("back");
  } catch (error) {
    next(error);
  }
};

module.exports.product_admin_delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });

    fs.unlinkSync("C:/Users/adria/OneDrive/Pulpit/Praca/wyszukiwarka/backend/public/" + product.img);
    await Product.deleteOne({ _id: id });
    await Cart.deleteMany({ productId: id });
    req.flash("success", "Product deleted");
    res.json("Deleted");
  } catch (error) {
    next(error);
  }
};
