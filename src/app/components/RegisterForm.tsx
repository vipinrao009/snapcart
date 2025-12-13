import {
  ArrowLeft,
  EyeIcon,
  EyeOff,
  Leaf,
  Loader,
  Loader2,
  Lock,
  LogIn,
  Mail,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import googleImage from "@/assets/Google__G__logo.svg.webp";
import React, { useState } from "react";
import axios from "axios";
import { log } from "console";

type propType = {
  previousStep: (s: number) => void;
};

const RegisterForm = ({ previousStep }: propType) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const formValidation =
    name.trim() !== "" && email.trim() !== "" && password.trim() !== "";

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsloading(true);
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      setIsloading(false);
    } catch (error) {
      console.log(error);
      setIsloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center relative bg-white px-6 py-10">
      <div
        className="absolute top-6 left-6 flex item-center justify-center gap-2 text-green-700 hover:text-green-800 transition-colors cursor-pointer"
        onClick={() => previousStep(1)}
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="font-medium">Back</span>
      </div>

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
        }}
        className="flex flex-col gap-3"
      >
        <h1 className="font-extrabold text-4xl text-green-700 mb-2">
          Create your account
        </h1>
        <p className="flex items-center text-gray-800 mb-8 justify-center">
          Join Snapcart today <Leaf className="text-green-600 w-5 h-5" />
        </p>

        <motion.form
          onSubmit={handleRegister}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
          }}
          className="flex flex-col gap-3 w-full max-w-sm"
        >
          <div className="relative">
            <User className="absolute left-3 top-3.5 w-5 h-5" />
            <input
              type="text"
              placeholder="Your name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full border border-gray-300 text-gray-800 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none py-3 pl-10 pr-4"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-5 h-5" />
            <input
              type="text"
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full border border-gray-300 text-gray-800 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none py-3 pl-10 pr-4"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your email"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full border border-gray-300 text-gray-800 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none py-3 pl-10 pr-4"
            />

            {showPassword ? (
              <EyeOff
                onClick={() => setShowPassword(false)}
                className="absolute top-3.5 right-3 cursor-pointer"
              />
            ) : (
              <EyeIcon
                onClick={() => setShowPassword(true)}
                className="absolute top-3.5 right-3 cursor-pointer"
              />
            )}
          </div>

          <button
            disabled={!formValidation || isLoading}
            className={`w-full shadow-md inline-flex items-center justify-center rounded-2xl py-3 transition-all text-white ${
              formValidation
                ? "bg-green-600 cursor-pointer"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            {isLoading ? <Loader className=" animate-spin h-5 w-5"/> : "Register"}
          </button>
        </motion.form>

        <div className="items-center gap-2 flex text-gray-400 text-sm mt-2">
          <span className="flex-1 h-px  bg-gray-500"></span>
          OR
          <span className="flex-1 h-px bg-gray-500"></span>
        </div>

        <button className="w-full cursor-pointer flex items-center justify-center rounded-xl gap-3 border border-gray-400 hover:bg-gray-50 py-3 text-gray-700 font-medium transition-all duration-200">
          <Image src={googleImage} width={30} height={30} alt="google" />
          Continue with google
        </button>
      </motion.div>
      <p className="flex gap-1 items-center text-gray-600 cursor-pointer mt-6 text-sm">
        Already have account <LogIn className="w-4 h-4" />{" "}
        <span className="text-green-600">Sign</span>
      </p>
    </div>
  );
};

export default RegisterForm;
