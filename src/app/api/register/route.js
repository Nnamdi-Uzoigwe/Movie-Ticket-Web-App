import dbConnect from "../../lib/mongodb";
import User from "../../lib/models/user";
import bcrypt from "bcryptjs";
import Cors from "cors";
import initMiddleware from "../../lib/initMiddleware";

// Initialize CORS middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: 'https://vilancy-movie-ticket-web-app.vercel.app', // Vercel frontend URL
  })
);

import { NextResponse } from "next/server";

// Add CORS middleware before handling the request
export async function POST(req) {
  await cors(req);  // Apply CORS to the incoming request

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Please fill all required fields" }, { status: 400 });
    }

    await dbConnect();

    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json({ error: "User email already exists" }, { status: 401 });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: "User created successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
