"use client";
import { ShoppingCart } from "lucide-react";
import mongoose from "mongoose";
import { motion } from "motion/react";
import Image from "next/image";

interface IGrocery {
  _id?: mongoose.Types.ObjectId;
  name: string;
  category: string;
  price: string;
  unit: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const GroceryItemCard = ({ item }: { item: IGrocery }) => {
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

        <motion.button
          whileTap={{
            scale: 0.9,
          }}
          className="flex w-full bg-green-600 hover:bg-green-700 transition-all duration-300 px-3 py-2 rounded-full items-center justify-center gap-2 text-white mt-2 cursor-pointer"
        >
          <ShoppingCart />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default GroceryItemCard;
