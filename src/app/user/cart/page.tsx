"use client";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBasketIcon,
  Trash,
  X,
} from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import {
  decreaseQuantity,
  deleteFromCart,
  increaseQuantity,
} from "@/redux/slice/cartSlice";
import { useRouter } from "next/navigation";

const Cartpage = () => {
  const { cartData, subTotal, deliveryFee, finalTotal } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  return (
    <div className="relative w-[95%] sm:w-[90%] md:w-[80%] mx-auto mt-8 mb-24">
      <Link
        href={"/"}
        className="absolute -top-2 left-0 flex items-center text-green-700 gap-2 hover:text-green-800 font-medium transition-all"
      >
        <ArrowLeft size={20} />
        <span className="hidden md:flex">Back</span>
      </Link>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 text-center  mb-10"
      >
        Your Shoping Cart
      </motion.h2>

      {cartData.length == 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center py-20 bg-white rounded-2xl shadow-md"
        >
          <ShoppingBasketIcon className="w-16 h-1/6 text-center mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg mb-6">
            Your cart is empty. Add some Grocery to continue shopping
          </p>
          <Link href={"/"}></Link>
          <Link
            className="bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 px-6 py-3 inline-block font-medium"
            href={"/"}
          >
            Continue Shopping
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            <AnimatePresence>
              {cartData.map((i, e) => (
                <motion.div
                  key={e}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex relative flex-col sm:flex-row items-center bg-white rounded-2xl shadow-md p-5 border border-gray-100 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="h-28 w-28 relative sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-xl overflow-hidden bg-white">
                    {i.image && (
                      <Image
                        src={i.image}
                        fill
                        alt={i.name}
                        className="object-contain  transition-transform duration-300 hover:scale-105"
                      />
                    )}
                  </div>
                  {/* text */}
                  <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-700 line-clamp-1">
                      {i.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">{i.unit}</p>
                    <p className="text-green-700 font-bold mt-1 text-sm sm:text-base">
                      ₹{Number(i.price) * i.quantity}
                    </p>
                  </div>

                  {/* Quantity manage */}
                  <div className="flex items-center justify-center sm:justify-end mt-3 gap-3 sm:mt-0 bg-gray-50 px-3 py-2 rounded-full">
                    <button
                      onClick={() => dispatch(decreaseQuantity(i._id))}
                      className="bg-white p-1.5 hover:bg-green-100 transition-all rounded-full duration-300 border border-gray-200 cursor-pointer "
                    >
                      <Minus />
                    </button>
                    <span className="font-semibold text-gray-800 w-6 text-center">
                      {i.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(increaseQuantity(i._id))}
                      className="bg-white p-1.5 hover:bg-green-100 transition-all rounded-full duration-300 border border-gray-200 cursor-pointer "
                    >
                      <Plus />
                    </button>
                  </div>
                  <button
                    onClick={() => dispatch(deleteFromCart(i._id))}
                    className="absolute top-2 right-3 flex text-red-700 hover:text-red-800 cursor-pointer font-bold"
                  >
                    <Trash />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white h-fit border border-gray-100 flex flex-col rounded-2xl p-6 shadow-xl sticky top-24"
          >
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">
              Order Summary
            </h2>
            <div className="space-y-4 text-gray-700 text-sm sm:text-base">
              <div className="flex justify-between">
                <span>Subtotal: </span>
                <span className="text-green-700 font-semibold">
                  ₹{subTotal}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Fee: </span>
                <span className="text-green-700 font-semibold">
                  {deliveryFee}
                </span>
              </div>

              <hr className="my-3" />
              <div className="flex justify-between font-bold text-lg sm:text-xl">
                <span>Final amount: </span>
                <span className="text-green-700 font-bold">{finalTotal}</span>
              </div>
            </div>

            <motion.div
              onClick={() => router.push("/user/checkout")}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 hover:bg-green-700 py-2 mt-6 text-center rounded-full text-white cursor-pointer transition-all font-semibold text-sm sm:text-base"
            >
              Proceed to checkout
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Cartpage;
