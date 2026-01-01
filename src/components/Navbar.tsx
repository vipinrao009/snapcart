"use client";
import type { RootState } from "@/redux/store";
import {
  Boxes,
  Clipboard,
  LogOut,
  Menu,
  Package,
  PlusCircle,
  Search,
  SearchIcon,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import mongoose from "mongoose";
import { AnimatePresence, motion } from "motion/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";

interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  mobile?: string;
  role: "user" | "deliveryBoy" | "admin";
  image?: string;
}

const Navbar = ({ user }: { user: IUser }) => {
  const [open, setOpen] = useState(false);
  const [searchBarOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartData } = useSelector((state: RootState) => state.cart);

  const profileDropdown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //ye smjha nahi aaya hai
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileDropdown.current &&
        !profileDropdown.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sideBar = menuOpen
    ? createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
            exit={{ x: -100, opacity: 0 }}
            className="fixed top-0 left-0 h-full w-[75%] sm:w-[60%] z-999 bg-linear-to-b from-green-800/90 via-green-700/80 to-green-900/90 backdrop:blur-xl border-r border-green-400/20 shadow-[0_0_50px_-10px_rgba(0,255,100,0.3)] flex flex-col p-6 text-white"
          >
            <div className="flex justify-between">
              <h1 className="font-extrabold text-2xl tracking-wide text-white/90">
                Admin Pannel
              </h1>
              <button
                onClick={() => setMenuOpen(false)}
                className="font-bold transition text-white/80 text-2xl hover:text-red-600"
              >
                X
              </button>
            </div>

            <div className=" flex gap-3 p-3 mt-3 items-center rounded-xl bg-white/10 hover:bg-white/15 transition-all shadow-inner">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-b-green-400/60 shadow-lg">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt="image"
                    className="object-cover rounded-full"
                    fill
                  />
                ) : (
                  <User />
                )}
              </div>

              <div>
                <h2 className="font-semibold text-lg text-white capitalize">
                  {user.name}
                </h2>
                <p className="capitalize text-green-200 tracking-wide text-xs">
                  {user.role}
                </p>
              </div>
            </div>

            <div className="items-center gap-4">
              <Link
                href={"/admin/add-grocery"}
                className="flex gap-3 p-3 mt-3 items-center rounded-xl bg-white/10 hover:bg-white/15 transition-all shadow-inner"
              >
                <PlusCircle className="w-5 h-5" />
                Add Grocery
              </Link>
              <Link
                href={""}
                className="flex gap-3 p-3 mt-3 items-center rounded-xl bg-white/10 hover:bg-white/15 transition-all shadow-inner"
              >
                <Boxes className="w-5 h-5" />
                View Grocery
              </Link>
              <Link
                href={""}
                className="flex gap-3 p-3 mt-3 items-center rounded-xl bg-white/10 hover:bg-white/15 transition-all shadow-inner"
              >
                <Clipboard className="w-5 h-5" />
                Manage Grocery
              </Link>
            </div>

            <div className="mt-5 border-t border-white/20"></div>

            <div
              onClick={async () => await signOut({ callbackUrl: "/" })}
              className="flex items-center gap-3 text-red-200 font-semibold mt-auto p-3 hover:bg-red-500/2 rounded-lg transition-all"
            >
              <LogOut />
              Logout
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )
    : null;

  console.log(user);
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] bg-linear-to-r from-green-500 to-green-700 rounded-2xl shadow-lg shadow-black/30 h-15 px-4 md:px-8 flex justify-between items-center z-50">
      {/* Left section */}
      <Link
        href="/"
        className="font-extrabold text-2xl text-white sm:text-3xl hover:scale-105 transition-transform"
      >
        Snapcart
      </Link>

      {user.role == "user" && (
        <form className="hidden md:flex item-center bg-white rounded-full px-4 py-2 w-1/2 shadow-md max-w-lg">
          <Search className="text-gray-500 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="search groceries..."
            className="w-full outline-none text-gray-700 placeholder-gray-400"
          />
        </form>
      )}

      <div className="flex gap-3 text-white items-center justify-center relative">
        {user.role == "user" && (
          <>
            <div
              onClick={() => setSearchOpen((pre) => !pre)}
              className="w-11 h-11 text-black bg-white items-center justify-center flex rounded-full shadow-md hover:scale-105 transition md:hidden"
            >
              <SearchIcon className="text-green-600 w-6 h-6" />
            </div>

            <Link
              href={""}
              className="bg-white h-11 w-11 flex justify-center items-center relative rounded-full hover:scale-105"
            >
              <ShoppingCart className="text-black " />
              <span className="absolute -top-1 -right-1 text-red w-5 h-5 bg-red-500 text-white flex items-center justify-center rounded-full text-xs font-semibold shadow">
                {cartData.length}
              </span>
            </Link>
          </>
        )}

        {user.role == "admin" && (
          <>
            <div className="hidden md:flex items-center gap-4">
              <Link
                href={"/admin/add-grocery"}
                className="flex items-center gap-2 bg-white rounded-full text-green-700 font-semibold px-4 py-2 hover:bg-green-100 transition-all"
              >
                <PlusCircle className="w-5 h-5" />
                Add Grocery
              </Link>
              <Link
                href={""}
                className="flex items-center gap-2 bg-white rounded-full text-green-700 font-semibold px-4 py-2 hover:bg-green-100 transition-all"
              >
                <Boxes className="w-5 h-5" />
                View Grocery
              </Link>
              <Link
                href={""}
                className="flex items-center gap-2 bg-white rounded-full text-green-700 font-semibold px-4 py-2 hover:bg-green-100 transition-all"
              >
                <Clipboard className="w-5 h-5" />
                Manage Grocery
              </Link>
            </div>

            <div
              onClick={() => setMenuOpen((pre) => !pre)}
              className="md:hidden bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
            >
              <Menu className="text-green-600 w-6 h-6" />
            </div>
          </>
        )}
        <div className="relative" ref={profileDropdown}>
          <div
            onClick={() => setOpen((pre) => !pre)}
            className="w-11 h-11 flex items-center justify-center overflow-hidden hover:scale-105 shadow-md rounded-full relative cursor-pointer"
          >
            {user.image ? (
              <Image
                src={user.image}
                alt="image"
                className="object-cover rounded-full"
                fill
              />
            ) : (
              <User />
            )}
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: -10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                exit={{ scale: 0.95, opacity: 0, y: -10 }}
                className="absolute w-56 mt-3 right-0 bg-white rounded-2xl shadow-xl border border-gray-200 p-3 z-999"
              >
                <div className="flex items-center gap-3 px-3 py-2 border-b border-gray-100">
                  <div className="w-10 h-10 relative rounded-full bg-green-100 flex items-center justify-center">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt="image"
                        className="object-cover rounded-full"
                        fill
                      />
                    ) : (
                      <User />
                    )}
                  </div>

                  <div>
                    <div className="text-gray-800 font-semibold">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {user.role}
                    </div>
                  </div>
                </div>

                {user.role == "user" && (
                  <Link
                    href={""}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-3 py-3 hover:bg-green-50 rounded-lg text-gray-700 font-medium"
                  >
                    <Package className="w-5 h-5 text-green-600" />
                    My orders
                  </Link>
                )}

                <button
                  onClick={() => {
                    setOpen(false);
                    signOut({ callbackUrl: "/login" });
                  }}
                  className="flex items-center cursor-pointer gap-2 px-3 py-3 hover:bg-red-50 rounded-lg font-medium w-full text-gray-700"
                >
                  <LogOut className="w-5 h-5 text-rose-600" />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {searchBarOpen && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: -10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                exit={{ scale: 0.95, opacity: 0, y: -10 }}
                className="fixed w-[90%] left-1/2 -translate-x-1/2 top-24 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-40 flex items-center"
              >
                <Search className="text-gray-600 mr-2" />
                <form className="grow">
                  <input
                    type="text"
                    className="w-full outline-none text-gray-700"
                    placeholder="Search groceries...."
                  />
                </form>
                <button onClick={() => setSearchOpen(false)}>
                  <X className="text-red-600 h-5 w-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {sideBar}
    </div>
  );
};

export default Navbar;
