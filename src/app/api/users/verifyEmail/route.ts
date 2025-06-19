import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export async function POST(request: NextResponse) {
  try {
    const reqBody = await request.json();
    const { userId } = reqBody;

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedToken = await bcrypt.hash(userId.toString(), salt);

    user.verifyToken = hashedToken;
    user.verifyTokenExpiry = Date.now() + 600000;

    const savedUser = await user.save();
    console.log("User created successfully", savedUser);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("error in verifyEmail", error);
  }
}
