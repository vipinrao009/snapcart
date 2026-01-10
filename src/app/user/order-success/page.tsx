"use client";
import React from "react";
import { easeInOut, motion } from "motion/react";
import { ArrowRight, CheckCircle, Package } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col min-h-[80vh] items-center justify-center text-center px-6 bg-linear-t from-green-50 to-white">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative"
      >
        <CheckCircle className="text-green-600 w-20 h-20 mt-4 md:w-24 md:h-24" />
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0.3, 0, 0.3], scale: [1, 0.6, 1] }}
          transition={{ repeat: Infinity, ease: "easeInOut", duration: 2 }}
          className=" absolute inset-0"
        >
          <div className="w-full h-full rounded-full bg-green-700 blur-2xl"></div>
        </motion.div>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-3xl md:text-4xl font-bold text-green-700 mt-6"
      >
        Order placed successfully
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-gray-600 mt-6 text-sm md:text-base max-w-md "
      >
        Thank' you for shopping with us! Your order has been placed and is being
        processed. You can track its progress in your{" "}
        <span className="font-semibold text-green-700">My Orders</span> section.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: [0, -10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1.2,
          ease: easeInOut,
        }}
        className="mt-10"
      >
        <Package className="w-16 h-16 md:h-20 md:w-20 text-green-500" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="mt-6"
      >
        <Link href={"/user/my-orders"}>
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.93 }}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 rounded-full px-8 py-3 transition-all text-white font-semibold shadow-lg text-base"
          >
            Go to My Order Page <ArrowRight />
          </motion.div>
        </Link>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[
          { top: "15%", left: "10%", size: 3, delay: 0 },
          { top: "30%", left: "25%", size: 4, delay: 0.4 },
          { top: "20%", left: "45%", size: 2.5, delay: 0.8 },
          { top: "45%", left: "60%", size: 5, delay: 0.2 },
          { top: "25%", left: "75%", size: 3.5, delay: 0.6 },
          { top: "35%", left: "90%", size: 2.5, delay: 1 },
          { top: "55%", left: "20%", size: 4.5, delay: 0.3 },
          { top: "60%", left: "60%", size: 3, delay: 0.9 },
        ].map((ball, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: ball.delay,
            }}
            style={{
              top: ball.top,
              left: ball.left,
              width: `${ball.size * 4}px`,
              height: `${ball.size * 4}px`,
            }}
            className="absolute rounded-full bg-green-400 shadow-[0_0_15px_rgba(34,197,94,0.8)] opacity-90"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default page;
