const Cart = require("../modules/Cart");
const Product = require("../modules/Product");
const mongoose = require("mongoose");

module.exports.cart_post = async (req, res, next) => {
  const { productId } = req.body;
  try {
    const cartProduct = await Cart.findOne({ productId, user: req.user.id });
    const product = await Product.findOne({ _id: productId });

    if (cartProduct) {
      req.flash("error", "Product already exist in cart");
      res.redirect("back");
    } else {
      req.body.quantity = 1;
      req.body.price = product.price;
      req.body.user = req.user.id;
      await Cart.create(req.body);

      req.flash("success", product.phone + " added to cart");
      res.redirect("back");
    }
  } catch (error) {
    next(error);
  }
};

module.exports.cart_get = async (req, res, next) => {
  try {
    const [productsPromise, totalPrice] = await productsTotalPrice(req, next);
    const products = await Promise.all(productsPromise);

    res.render("cart", { products, totalPrice });
  } catch (error) {
    next(error);
  }
};

module.exports.cart_put = async (req, res, next) => {
  const product = await Cart.findOne({ productId: req.body.productId, user: req.user.id });
  const { quantity, _id } = product;
  this.wrong_id(req, res);
  if (product) {
    try {
      switch (req.body.action) {
        case "DECREMENT":
          try {
            if (quantity <= 1) return res.json("Can't get 0 quantity");
            await Cart.findOneAndUpdate({ _id }, { quantity: quantity - 1 });
            const [products, totalPrice] = await productsTotalPrice(req, next);
            res.json({ products, totalPrice });
          } catch (error) {
            next(error);
          }
          break;

        case "INCREMENT":
          try {
            await Cart.findOneAndUpdate({ _id }, { quantity: quantity + 1 });
            const [products, totalPrice] = await productsTotalPrice(req, next);
            res.json({ products, totalPrice });
          } catch (error) {
            next(error);
          }
          break;
        default:
          return;
      }
    } catch (error) {
      next(error);
    }
  } else res.redirect("error/404");
};

module.exports.cart_delete = async (req, res) => {
  this.wrong_id(req, res);
  await Cart.deleteOne({ user: req.user.id, productId: req.params.id });
  res.json("Deleted");
};

module.exports.wrong_id = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    req.flash("error", "Invalid product id");
    res.redirect("back");
  }
};

async function productsTotalPrice(req, next) {
  let totalPrice = 0;

  try {
    const cart = await Cart.find({ user: req.user.id });
    const promiseProducts = cart.map(async ({ productId, quantity }) => {
      const product = await Product.findOne({ _id: productId });

      product.quantity = quantity;
      totalPrice += product.price * quantity;
      return product;
    });
    const products = await Promise.all(promiseProducts);

    return [products, totalPrice];
  } catch (error) {
    next(error);
  }
}
