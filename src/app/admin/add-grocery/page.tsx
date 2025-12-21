"use client";

import { ArrowLeft, Loader, PlusCircle, Upload } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import axios from "axios";

const units = ["kg", "g", "piece", "liter", "ml", "pack"];

const categories = [
  "Fruits & Vegitables",
  "Dairy & Eggs",
  "Rice, Aata & Grains",
  "Snacks & Biscuits",
  "Spices & Masalas",
  "Beverages & Drinks",
  "Personal Care",
  "Households Essentials",
  "Instant & Packaged Food",
  "Baby & Pet Care",
];

const AddGrocery = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [image, setImage] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("name", name);
      form.append("category", category);
      form.append("unit", unit);
      form.append("price", price);
      if (image) form.append("image", image);

      await axios.post("/api/admin/add-grocery", form);

      // Reset form
      setName("");
      setCategory("");
      setUnit("");
      setPrice("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-white px-4 py-6 relative">
      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-5 left-5 flex items-center gap-2 bg-white px-4 py-2 rounded-full text-green-700 font-semibold shadow hover:bg-green-100 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden md:block">Back</span>
      </Link>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-full max-w-lg rounded-3xl border border-green-300 shadow-xl p-6
                   max-h-[80vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center gap-2">
            <PlusCircle className="w-7 h-7 text-green-700" />
            <h1 className="text-xl font-bold text-green-800">Add Grocery</h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Enter grocery details below
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Grocery Name <span className="text-red-500">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="eg: Milk"
              required
            />
          </div>

          {/* Category + Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-1 px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
                required
              >
                <option value="">Select</option>
                {categories.map((cat, i) => (
                  <option key={i}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Unit <span className="text-red-500">*</span>
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full mt-1 px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
                required
              >
                <option value="">Select</option>
                {units.map((u, i) => (
                  <option key={i}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              className="w-full mt-1 px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="eg: 120"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="flex items-center gap-4 flex-wrap">
            <label
              htmlFor="image"
              className="cursor-pointer flex items-center gap-2 bg-green-50 text-green-700 font-semibold border rounded-xl px-4 py-2 hover:bg-green-100 transition"
            >
              <Upload className="w-5 h-5" />
              Upload Image
            </label>

            <input
              id="image"
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />

            {preview && (
              <Image
                src={preview}
                alt="preview"
                width={70}
                height={70}
                className="rounded-xl border object-cover"
              />
            )}
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full mt-4 bg-linear-to-r from-green-500 to-green-700
                       text-white font-semibold py-3 rounded-xl shadow
                       flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              "Add Grocery"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddGrocery;
