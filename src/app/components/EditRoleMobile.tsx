"use client";
import axios from "axios";
import { ArrowRight, Bike, User, UserCog } from "lucide-react";
import { motion } from "motion/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EditRoleMobile = () => {
  const [roles, setRoles] = useState([
    { id: "admin", label: "Admin", icon: UserCog },
    { id: "user", label: "User", icon: User },
    { id: "deliveryBoy", label: "Delivery Boy", icon: Bike },
  ]);

  const [selectedRole, setSelectedRole] = useState("");
  const [mobile, setMobile] = useState("");

  const isDisabled = mobile.length !== 10 || !selectedRole;
  const router = useRouter()

  const handleEdit = async () => {
    try {
      const res = await axios.post("/api/user/edit-role-mobile", {
        role: selectedRole,
        mobile,
      });
      router.push("/")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col p-6 items-center w-full min-h-screen">
      <motion.h1
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="text-3xl md:text-4xl font-extrabold text-green-700"
      >
        Select your role
      </motion.h1>
      <div className="gap-6 flex flex-col md:flex-row mt-10 items-center justify-center">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole == role.id;
          return (
            <motion.div
              whileTap={{ scale: 0.9 }}
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`flex flex-col items-center justify-center w-44 h-40 rounded-2xl border-2 transition-all ${
                isSelected
                  ? "bg-green-100 border-green-600  shadow-lg"
                  : " border-gray-300 bg-white hover:border-green-400"
              }`}
            >
              <Icon />
              <span>{role.label}</span>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          delay: 0.5,
        }}
        className="flex flex-col items-center mt-10"
      >
        <label htmlFor="mobile" className="text-gray-700 font-medium mb-2">
          Enter mobile number
        </label>
        <input
          type="tel"
          id="mobile"
          placeholder="eg. 0000000000"
          className="w-64 px-4 py-3 rounded-xl border border-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
          onChange={(e) => setMobile(e.target.value)}
        />
      </motion.div>

      <motion.button
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          delay: 0.5,
        }}
        disabled={isDisabled}
        onClick={handleEdit}
        className={`w-[200px] inline-flex items-center gap-2 rounded-xl mt-10 px-8 py-3 transition-all
            ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 cursor-pointer hover:bg-green-600"
            }`}
      >
        Go to Home
        <span>
          <ArrowRight />
        </span>
      </motion.button>
    </div>
  );
};

export default EditRoleMobile;
