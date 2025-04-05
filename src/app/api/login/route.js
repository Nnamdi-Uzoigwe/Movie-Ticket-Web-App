import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../../lib/mongodb";
import User from "../../lib/models/user";
import Cors from "cors";
import initMiddleware from "../../lib/initMiddleware";

const JWT_SECRET = process.env.JWT_SECRET;

// Initialize CORS middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST'],
    origin: 'https://vilancy-movie-ticket-web-app.vercel.app', // Vercel frontend URL
  })
);

export async function POST(req) {
  await cors(req); // Apply CORS to the incoming request

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
