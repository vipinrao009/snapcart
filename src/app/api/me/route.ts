import { auth } from "@/auth";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      NextResponse.json(
        { message: "User is not authenticated" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: session?.user?.email }).select(
      "-password"
    );
    if (!user) {
      NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    NextResponse.json({ message: "Failed to get user" }, { status: 400 });
  }
}
