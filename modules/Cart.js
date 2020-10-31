const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Cart = mongoose.model("Cart", cartSchema, "Cart");

module.exports = Cart;
