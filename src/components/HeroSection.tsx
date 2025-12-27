"use client";
import {
  Leaf,
  Phone,
  PhoneIcon,
  ShoppingBasket,
  Smartphone,
  Truck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { button } from "motion/react-client";

const slide = [
  {
    id: 1,
    icon: <Leaf className="w-20 h-20 sm:h-28 sm:w-28 text-green-400" />,
    title: "Fresh Organic Groceries 🍅",
    subTitle:
      "Farm-fresh fruits, vegitable, and daily essentials delivered to you",
    btnText: "Shop now",
    bg: "https://images.unsplash.com/photo-1605447813584-26aeb3f8e6ae?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    icon: <Truck className="w-20 h-20 sm:h-28 sm:w-28 text-yellow-400" />,
    title: "Fast & Reliable Delivery 🚚",
    subTitle: "We ensure your groceries reach at doorstep in no time",
    btnText: "Order now",
    bg: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?q=80&w=1115&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    icon: <Smartphone className="w-20 h-20 sm:h-28 sm:w-28 text-yellow-400" />,
    title: "Fast & Reliable Delivery 📱",
    subTitle: "We ensure your groceries reach at doorstep in no time",
    btnText: "Order now",
    bg: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?q=80&w=1115&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slide.length); // ✅ FIX
    }, 4000);

    return () => clearInterval(timer); // ✅ FIX
  }, []);

  return (
    <div className="relative mt-25 w-[98%] h-[80vh] mx-auto rounded-3xl shadow-2xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={slide[currentSlide].bg}
            alt="slide"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 backdrop:blur-1px" />
          //blur karta hai slider ke image ko
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-3 flex flex-col items-center justify-center gap-3"
          >
            <div className="bg-white/10 p-4 backdrop-blur-2xl shadow-1 rounded-full">
              {slide[currentSlide].icon}
            </div>
            <h1 className="text-3xl sm:text-6xl md:text-4xl text-gray-200 font-extrabold tracking-tight">
              {slide[currentSlide].title}
            </h1>
            <h1 className="text-lg sm:text-xl text-gray-200 font-extrabold tracking-tight">
              {slide[currentSlide].subTitle}
            </h1>

            <motion.button
              whileHover={{ scale: 1.09 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="mt-5 flex items-center justify-center gap-3 bg-white rounded-full px-8 py-3  text-green-700 hover:bg-green-100 cursor-pointer shadow-lg transition-all duration-300 font-semibold"
            >
              <ShoppingBasket className="w-5 h-5" />
              {slide[currentSlide].btnText}
            </motion.button>
          </motion.div>
        </motion.div>
        <div className="absolute flex gap-3 left-1/2 bottom-6">
          {slide.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 transition-all rounded-full ${
                index == currentSlide ? "bg-white w-6" : "bg-white/50"
              }`}
            ></button>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;
