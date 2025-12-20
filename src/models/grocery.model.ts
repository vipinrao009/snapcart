import mongoose, { Schema } from "mongoose";

interface IGrocery {
  _id?: mongoose.Types.ObjectId;
  name: string;
  category: string;
  price: string;
  unit: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const grocerySchema = new Schema<IGrocery>(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
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
      ],
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum:[
        "kg","g","piece","liter","ml","pack"
      ]
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Grocery = mongoose.models.Grocery || mongoose.model("Grocery", grocerySchema);

export default Grocery;
