import mongoose from "mongoose";

interface IOrder {
  _id?: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  items: [
    {
      grocery: mongoose.Types.ObjectId;
      name: string;
      unit: string;
      price: string;
      image: string;
      quantity: number;
    }
  ];
  totalAmount: number;
  paymentMethod: "cod" | "online";
  address: {
    fullName: string;
    mobile: string;
    city: string;
    state: string;
    pinCode: string;
    fullAddress: string;
    latitude: number;
    longitude: number;
  };
  status: "pending" | "out for delivery" | "delivered";
  createdAt: Date;
  updateAt: Date;
}

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        grocery: {
          type: mongoose.Types.ObjectId,
          ref: "Grocery",
          required: true,
        },
        name: String,
        unit: String,
        price: String,
        image: String,
        quantity: Number,
      },
    ],
    totalAmount: {
      type: Number,
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      default: "cod",
    },
    address: {
      fullName: String,
      mobile: String,
      city: String,
      state: String,
      pinCode: String,
      fullAddress: String,
      latitude: Number,
      longitude: Number,
    },
    status: {
      type: String,
      enum: ["pending", "out for delivery", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;
