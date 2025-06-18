import { connect } from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    console.log("registering user post request:");
    //taking values fron request
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    //check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      console.log(user);
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    //save user
    const savedUser = await newUser.save();
    console.log("User created successfully", savedUser);
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    console.error("Backend error:", error.message);
    console.log("error generating user", error);
  }
}
