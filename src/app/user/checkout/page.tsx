"use client";
import { RootState } from "@/redux/store";
import {
  ArrowLeft,
  Building2,
  Home,
  MapPin,
  Navigation2,
  Phone,
  Search,
  SearchIcon,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

const Checkout = () => {
  const router = useRouter();
  const { userData } = useSelector((state: RootState) => state.user);
  const [address, setAddress] = useState({
    name: userData?.name,
    mobile: userData?.mobile,
    city: "",
    state: "",
    pinCode: "",
    fullAddress: "",
  });

  return (
    <div className="w-[90%] sm:w-[80%] mx-auto relative py-10">
      <motion.button
        onClick={() => router.push("/user/cart")}
        whileTap={{ scale: 0.97 }}
        className="absolute flex gap-2 left-0 top-2 text-green-700 hover:text-green-800 font-semibold items-center"
      >
        <ArrowLeft size={16} />
        <span>Back to cart</span>
      </motion.button>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-green-700 font-bold text-3xl md:text-4xl mb-10 text-center"
      >
        Checkout page
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8 ">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
        >
          <h1 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin /> Delivery Address
          </h1>

          <div className="space-y-4">
            <div className="relative">
              <User
                className="absolute left-3 top-3 text-green-600"
                size={18}
              />
              <input
                className="pl-10 p-3 w-full rounded-xl bg-gray-50 border text-sm"
                type="text"
                value={address.name}
                onChange={(e) =>
                  setAddress({ ...address, name: e.target.value })
                }
              />
            </div>

            <div className="relative">
              <Phone
                className="absolute left-3 top-3 text-green-600"
                size={18}
              />
              <input
                className="pl-10 p-3 w-full rounded-xl bg-gray-50 border text-sm"
                type="text"
                value={address.mobile}
                onChange={(e) =>
                  setAddress({ ...address, mobile: e.target.value })
                }
              />
            </div>

            <div className="relative">
              <Home
                className="absolute left-3 top-3 text-green-600"
                size={18}
              />
              <input
                className="pl-10 p-3 w-full rounded-xl bg-gray-50 border text-sm"
                type="text"
                placeholder="full address"
                value={address.fullAddress}
                onChange={(e) =>
                  setAddress({ ...address, fullAddress: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="relative">
                <Building2
                  className="absolute left-3 top-3 text-green-600"
                  size={18}
                />
                <input
                  className="pl-10 p-3 w-full rounded-xl bg-gray-50 border text-sm"
                  type="text"
                  placeholder="city"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                />
              </div>

              <div className="relative">
                <Navigation2
                  className="absolute left-3 top-3 text-green-600"
                  size={18}
                />
                <input
                  className="pl-10 p-3 w-full rounded-xl bg-gray-50 border text-sm"
                  type="text"
                  placeholder="state"
                  value={address.state}
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                />
              </div>

              <div className="relative">
                <Search
                  className="absolute left-3 top-3 text-green-600"
                  size={18}
                />
                <input
                  className="pl-10 p-3 w-full rounded-xl bg-gray-50 border text-sm"
                  type="text"
                  placeholder="pincode"
                  value={address.pinCode}
                  onChange={(e) =>
                    setAddress({ ...address, pinCode: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <input type="text" className="flex-1 border p-3 shadow-lg rounded-2xl focus:ring-2 focus:ring-green-500 text-sm outline-none" placeholder="search your city..." />
              <button className="bg-green-600 text-white px-5 font-medium rounded-lg hover:bg-green-700 transition-all cursor-pointer">Search</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
