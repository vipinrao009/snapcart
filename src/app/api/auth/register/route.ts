import User from "@/models/user.model";
import { connectTODatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connectTODatabase();
    const { name, email, password } = await req.json();

    const existUser = await User.findOne({ email });

    if (existUser) {
      return NextResponse.json(
        { message: "User already exist" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be atleast 6 charactor" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(user, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { message: `Register error ${error}` },
      { status: 400 }
    );
  }
}
