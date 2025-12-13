"use client";
import { ArrowRight, Bike, ShoppingBasket } from "lucide-react";
import { motion } from "motion/react";

type propType = {
  nextStep: (s: number) => void;
};

const Welcome = ({ nextStep }: propType) => {
  return (
    <div className="flex flex-col text-center items-center justify-center p-6 min-h-screen">
      <motion.div
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          delay: 0.3,
        }}
        className="flex justify-center items-center gap-3"
      >
        <ShoppingBasket className="h-10 w-10 text-green-700" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700">
          Snapcart
        </h1>
      </motion.div>

      <motion.p
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="mt-4 text-gray-700 max-w-lg text-lg md:xl"
      >
        Your one step destination for fresh groceries, oraganic produce and
        daily essentials delivered right to your doorstep
      </motion.p>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          delay: 0.5,
        }}
        className="mt-10 flex gap-10 justify-center items-center"
      >
        <ShoppingBasket className="h-24 w-24 text-green-600 md:h-32 md:w-32 drop-shadow-md" />
        <Bike className="h-24 w-24 text-orange-600 md:h-32 md:w-32 drop-shadow-md" />
      </motion.div>

      <motion.button
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          delay: 0.5,
        }}
        className="items-center flex gap-2 bg-green-600 hover:bg-green-700 py-3 px-8 font-semibold text-white rounded-2xl shadow-md transition-all duration-200 mt-10"
        onClick={()=>nextStep(2)}
      >
        Next
        <ArrowRight />
      </motion.button>
    </div>
  );
};

export default Welcome;
