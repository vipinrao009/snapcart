import { auth } from "@/auth";
import { connectTODatabase } from "@/lib/db";
import Order from "@/models/order.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectTODatabase();
    const { userId, items, paymentMethod, totalAmount, address } =
      await req.json();

    if (!userId || !items || !paymentMethod || !totalAmount || !address) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const newOrder = await Order.create({
      user: userId,
      items,
      paymentMethod,
      totalAmount,
      address,
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to place order ${error}` },
      { status: 500 }
    );
  }
}
