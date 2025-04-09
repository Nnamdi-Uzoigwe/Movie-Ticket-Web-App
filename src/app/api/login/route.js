// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import dbConnect from "../../lib/mongodb";
// import User from "../../lib/models/user";
// import Cors from "cors";
// import initMiddleware from "../../lib/initMiddleware";

// const JWT_SECRET = process.env.JWT_SECRET;

// // Initialize CORS middleware
// const cors = initMiddleware(
//   Cors({
//     methods: ['GET', 'POST'],
//     origin: 'https://vilancy-movie-ticket-web-app.vercel.app', // Vercel frontend URL
//   })
// );

// export async function POST(req) {
//   await cors(req); // Apply CORS to the incoming request

//   try {
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json({ error: "Please fill all required fields" }, { status: 400 });
//     }

//     await dbConnect();

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
//     }

//     // Create JWT token
//     const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "2h" });

//     return NextResponse.json({
//       message: "Login successful",
//       token,
//       user: { id: user._id, email: user.email },
//     }, { status: 200 });
//   } catch (e) {
//     return NextResponse.json({ error: e.message }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../../lib/mongodb";
import User from "../../lib/models/user";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  // Set CORS headers
  // res.setHeader('Access-Control-Allow-Origin', 'https://vilancy-movie-ticket-web-app.vercel.app'); // Replace with your specific origin
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all required fields" });
    }

    await dbConnect();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "2h" });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}