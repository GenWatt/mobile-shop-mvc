const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productsSchema = new Schema({
  brand: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: Number,
  specification: {
    storage: { type: String, required: true },
    ram: { type: String, required: true },
    processor: { type: String, required: true },
  },
  _id: { type: Schema.Types.ObjectId, required: true },
});

const Product = mongoose.model("Products", productsSchema, "Mobile Phones");

module.exports = Product;
