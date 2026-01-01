"use client";
import {
  addTocart,
  decreaseQuantity,
  increaseQuantity,
} from "@/redux/slice/cartSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import mongoose from "mongoose";
import { motion } from "motion/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

interface IGrocery {
  _id: mongoose.Types.ObjectId;
  name: string;
  category: string;
  price: string;
  unit: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const GroceryItemCard = ({ item }: { item: IGrocery }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { cartData } = useSelector((state: RootState) => state.cart);

  const cartItem = cartData.find((i) => i._id == item._id);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0, scale: 0.9 }}
      whileInView={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.5 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
    >
      <div className="relative w-full aspect-4/3 bg-gray-50 overflow-hidden group">
        {item.image && (
          <Image
            src={item.image}
            fill
            alt={item.name}
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-contain p-4 transition-transform duration-300  group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      </div>
      <div className="flex flex-col flex-1 p-4">
        <p className="text-xs text-gray-500 font-medium mb-1">
          {item.category}
        </p>
        <h3>{item.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-full font-medium">
            {item.unit}
          </span>
          <span className="text-green-600 text-xl font-bold">
            ₹{item.price}
          </span>
        </div>

        {!cartItem ? (
          <motion.button
            whileTap={{
              scale: 0.9,
            }}
            onClick={() => dispatch(addTocart({ ...item, quantity: 1 }))}
            className="flex w-full bg-green-600 hover:bg-green-700 transition-all duration-300 px-3 py-2 rounded-full items-center justify-center gap-2 text-white mt-2 cursor-pointer"
          >
            <ShoppingCart />
            Add to Cart
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center mt-4 border border-green-200 rounded-full px-4 py-2 gap-4"
          >
            <button
              onClick={() => dispatch(decreaseQuantity(item._id))}
              className="w-7 h-7 cursor-pointer flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 transition-all"
            >
              <Minus />
            </button>
            <span className="text-sm font-bold text-gray-800">
              {cartItem.quantity}
            </span>
            <button
              onClick={() => dispatch(increaseQuantity(item._id))}
              className="w-7 cursor-pointer h-7 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 transition-all"
            >
              <Plus />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default GroceryItemCard;
