// import dbConnect from "../../lib/mongodb";
// import User from "../../lib/models/user";
// import bcrypt from "bcryptjs";
// import Cors from "cors";
// import initMiddleware from "../../lib/initMiddleware";
// import { NextResponse } from "next/server";

// // Initialize CORS middleware
// const cors = initMiddleware(
//   Cors({
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     origin: 'https://vilancy-movie-ticket-web-app.vercel.app', // Vercel frontend URL
//   })
// );


// // Add CORS middleware before handling the request
// export async function POST(req) {
//   await cors(req);  // Apply CORS to the incoming request

//   try {
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json({ error: "Please fill all required fields" }, { status: 400 });
//     }

//     await dbConnect();

//     const userExist = await User.findOne({ email });
//     if (userExist) {
//       return NextResponse.json({ error: "User email already exists" }, { status: 401 });
//     }
    
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ email, password: hashedPassword });
//     await newUser.save();

//     return NextResponse.json({ message: "User created successfully" }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


// app/api/register/route.js
import dbConnect from "../../lib/mongodb";
import User from "../../lib/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    await dbConnect();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}