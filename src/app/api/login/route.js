import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../../lib/mongodb";
import User from "../../lib/models/user"

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Please fill all required fields" }, { status: 400 });
    }

    await dbConnect();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "2h" });

    return NextResponse.json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email },
    }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
