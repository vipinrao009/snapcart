import { auth } from "@/auth";
import uploadOnCloudinary from "@/lib/cloudinary";
import { connectTODatabase } from "@/lib/db";
import Grocery from "@/models/grocery.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectTODatabase();

    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json(
        { message: "You are not authorized" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const price = formData.get("price") as string;
    const unit = formData.get("unit") as string;
    const file = formData.get("image") as File;

    let imageUrl;
    if (file) {
      imageUrl = await uploadOnCloudinary(file);
    }

    const gorcery = await Grocery.create({
      name,
      category,
      price,
      unit,
      image: imageUrl,
    });

    return NextResponse.json({ gorcery }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add grocery" },
      { status: 400 }
    );
  }
}
