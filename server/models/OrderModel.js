const mongoose = requrie("mongoose");

const oderSchema = mongoose.Schema({
  orderItems: [
    {
      name: { type: String },
      price: { type: Number },
      image: { type: String },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0.0,
  },
  isPaid: {
    type: Boolean,
  },
});

const Order = mongoose.model("orders", oderSchema);
module.exports = Order;
