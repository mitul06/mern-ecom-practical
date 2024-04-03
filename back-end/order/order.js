const mongoose = require("mongoose");
const { ORDER_STATUS } = require("../utils/contants/contants");

const { AWAITING, CANCELLED, CONFIRMED, DELIVERED, PLACED } = ORDER_STATUS;

const orderSchema = new mongoose.Schema(
  {
    products: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "product",
    },
    price: {
      type: Number,
    },
    totalQuantity: {
      type: Number,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      enum: [AWAITING, CANCELLED, CONFIRMED, DELIVERED, PLACED],
      default: PLACED,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("order", orderSchema);

module.exports = { OrderModel };
