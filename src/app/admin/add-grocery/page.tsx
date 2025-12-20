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
  const [preview, setPreview] = useState<string | null>();
  const [image, setImage] = useState<Blob | null>();
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length == 0) return;

    const file = files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const form = new FormData();

      form.append("name", name);
      form.append("category", category);
      form.append("price", price);
      form.append("unit", unit);
      if (image) {
        form.append("image", image);
      }

      const res = await axios.post("/api/admin/add-grocery", form);
      setLoading(false)
      console.log(res);
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-green-50 to-white px-4 py-16 relative">
      <Link
        href={"/"}
        className=" absolute top-6 left-6 flex gap-2 text-green-700 font-semibold bg-white px-4 py-2 rounded-full hover:bg-green-100 hover:shadow-lg transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden md:flex">Back to home</span>
      </Link>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white w-full max-w-xl shadow-2xl rounded-3xl border border-green-300 p-8"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-8 h-8 text-green-800" />
            <h1>Add Your Grocery</h1>
          </div>
          <p className="text-gray-500 text-sm text-center mt-2">
            Fill out the details below to add new grocery item
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          <div>
            <label className="mb-1 text-gray-700 font-medium" htmlFor="name">
              Grocery name
            </label>
            <span className="text-red-500">*</span>
            <input
              type="text"
              id="name"
              className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all"
              placeholder="eg: milk"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                className="block mb-1 text-gray-700 font-medium"
                htmlFor="category"
              >
                Category <span className="text-red-500">*</span>
              </label>

              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                name="category"
                className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all"
              >
                <option value="">Select Category</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block mb-1 text-gray-700 font-medium"
                htmlFor="unit"
              >
                Unit <span className="text-red-500">*</span>
              </label>

              <select
                name="category"
                id="unit"
                onChange={(e) => setUnit(e.target.value)}
                value={unit}
                className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all"
              >
                <option value="">Select Unit</option>
                {units.map((u, i) => (
                  <option key={i} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 text-gray-700 font-medium" htmlFor="price">
              Price <span className="text-red-500">*</span>
            </label>

            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              type="text"
              id="price"
              className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all"
              placeholder="eg: 120"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5">
            <label
              className="mb-1 cursor-pointer flex items-center justify-center gap-2 bg-green-50 text-green-700 font-semibold border border-r-green-200 rounded-2xl px-6 py-3 hover:bg-gray-100 transition-all w-full sm:w-auto "
              htmlFor="image"
            >
              <Upload className="h-5 w-5" /> Upload Image
            </label>

            <input
              onChange={handleImageChange}
              type="file"
              accept="image/*"
              hidden
              id="image"
              className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition-all sm:m-auto"
              placeholder="eg: milk"
            />

            {preview && (
              <Image
                className="rounded-xl shadow-md border border-gray-200 object-cover"
                src={preview}
                width={100}
                height={100}
                alt="image"
              />
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            disabled={loading}
            className="mt-4 bg-linear-to-r from-green-500 to-green-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-60 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? <Loader className="h-5 w-5 animate-spin"/> : "Add Grocery"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddGrocery;
