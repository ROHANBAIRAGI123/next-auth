import { connect } from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    console.log("logging in user in backend");
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_TOKEN!, {
      expiresIn: "10d",
    });

    const response = NextResponse.json({
      message: "User logged in successfully",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    console.log("error logging in user in backend", error);
    return NextResponse.json(
      { error: "Error logging in user" },
      { status: 500 }
    );
  }
}
