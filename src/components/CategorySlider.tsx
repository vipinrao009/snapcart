"use client";
import {
  Apple,
  Baby,
  BoxIcon,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Cookie,
  Flame,
  Heart,
  Home,
  Milk,
  Wheat,
} from "lucide-react";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const categories = [
  {
    id: 1,
    name: "Fruits & Vegitables",
    icon: Apple,
    color: "bg-green-100",
  },
  {
    id: 2,
    name: "Dairy & Eggs",
    icon: Milk,
    color: "bg-yellow-100",
  },
  {
    id: 3,
    name: "Rice, Aata & Grains",
    icon: Wheat,
    color: "bg-orange-100",
  },
  {
    id: 4,
    name: "Snacks & Biscuits",
    icon: Cookie,
    color: "bg-pink-100",
  },
  {
    id: 5,
    name: "Spices & Masalas",
    icon: Flame,
    color: "bg-red-100",
  },
  {
    id: 6,
    name: "Beverages & Drinks",
    icon: Coffee,
    color: "bg-blue-100",
  },
  {
    id: 7,
    name: "Personal Care",
    icon: Heart,
    color: "bg-purple-100",
  },
  {
    id: 8,
    name: "Households Essentials",
    icon: Home,
    color: "bg-lime-100",
  },
  {
    id: 9,
    name: "Instant & Packaged Food",
    icon: BoxIcon,
    color: "bg-teal-100",
  },
  {
    id: 10,
    name: "Baby & Pet Care",
    icon: Baby,
    color: "bg-rose-100",
  },
];

const CategorySlider = () => {
  const scrollref = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState<boolean>(false);
  const [showRight, setShowRight] = useState<boolean>(false);

  const scroll = (direction: "left" | "right") => {
    if (!scrollref.current) return;

    const scrollAmount = direction == "left" ? -300 : 300;
    scrollref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const checkScroll = () => {
    if (!scrollref.current) return;

    const { scrollLeft, clientWidth, scrollWidth } = scrollref.current;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    scrollref.current?.addEventListener("scroll", checkScroll);
    checkScroll();
    return () => removeEventListener("scroll", checkScroll);
  }, []);
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.5 }}
      className="w-[90%] md:w-[80%] mx-auto mt-10 relative"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 text-center mb-6">
        🛒 Shop by Category
      </h2>

      {showLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0  top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-white hover:bg-green-100 rounded-full shadow-lg cursor-pointer"
        >
          <ChevronLeft />
        </button>
      )}
      <div
        className="flex gap-6 overflow-x-auto px-10 py-4 scrollbar-hide scroll-smooth"
        ref={scrollref}
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <motion.div
              layout
              key={cat.id}
              className={`min-w-[150px] md:w-[180px] flex flex-col items-center justify-center rounded-2xl ${cat.color} shadow-md hover:shadow-xl transition-all cursor-pointer`}
            >
              <div className="flex flex-col items-center justify-center p-5">
                <Icon className="w-10 h-10 text-green-700 mb-3" />
                <p className="text-center text-sm md:text-base font-semibold text-gray-700">
                  {cat.name}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
      {showRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0  top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-white hover:bg-green-100 rounded-full shadow-lg cursor-pointer"
        >
          <ChevronRight />
        </button>
      )}
    </motion.div>
  );
};

export default CategorySlider;
