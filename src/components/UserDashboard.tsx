import React from "react";
import HeroSection from "./HeroSection";
import CategorySlider from "./CategorySlider";
import Grocery from "@/models/grocery.model";
import { connectTODatabase } from "@/lib/db";
import GroceryItemCard from "./GroceryItemCard";

const UserDashboard = async () => {
  await connectTODatabase();
  const groceries = await Grocery.find({}).lean();
  const plainGroceries = JSON.parse(JSON.stringify(groceries));
  return (
    <div>
      <HeroSection />
      <CategorySlider />
      <div className="w-[90%] md:w-[80%] mx-auto">
        <h2 className=" text-2xl md:text-3xl font-bold text-green-600 text-center mb-6">
          Popular Grocery Item
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {plainGroceries.map((item: any, index: any) => (
            <GroceryItemCard item={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
