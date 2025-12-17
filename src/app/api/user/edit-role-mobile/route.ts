import { auth } from "@/auth";
import { connectTODatabase } from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectTODatabase();
    const { mobile, role } = await req.json();
    const session = await auth();

    const user = await User.findByIdAndUpdate(
      session?.user?.id,
      {
        mobile,
        role,
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Role updated successfully.." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `{Error in role and mobile updated ${error}}` },
      { status: 400 }
    );
  }
}
