const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brand",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    stock: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    images: {
      type: [String],
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };
