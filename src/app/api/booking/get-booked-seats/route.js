
// import { NextResponse } from "next/server";
// import connectDB from "../../../lib/mongodb";
// import Booking from "../../../lib/models/booking";

// export async function POST(req) {
//   await connectDB();

//   try {
//     const { movieId } = await req.json();

//     if (!movieId) {
//       return NextResponse.json({ error: "movieId is required" }, { status: 400 });
//     }


//     const bookings = await Booking.find({ movieId }).populate("bookedSeat.user");

//     if (!bookings || bookings.length === 0) {
//       return NextResponse.json(
//         { data: { bookedSeat: [] } }, 
//         { status: 200 }
//       );
//     }

//     const bookedSeats = bookings.flatMap(booking => 
//       booking.bookedSeat.map(item => ({
//         seatNo: item.seatNo,
//         userId: item.user?._id?.toString() 
//       }))
//     );

//     return NextResponse.json(
//       { 
//         data: { 
//           bookedSeat: bookedSeats 
//         } 
//       }, 
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error("Error in get-booked-seats:", error);
//     return NextResponse.json(
//       { 
//         error: "Internal server error",
//         details: error.message 
//       }, 
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Booking from "../../../lib/models/booking";

export async function POST(req) {
  try {
    // 1. Connect to DB (move inside try-catch to handle connection errors)
    await connectDB();

    // 2. Parse request body
    const { movieId } = await req.json();
    if (!movieId) {
      return NextResponse.json(
        { error: "movieId is required" },
        { status: 400 }
      );
    }

    // 3. Query bookings (lean() for performance + explicit projection)
    const bookings = await Booking.find(
      { movieId },
      { "bookedSeat.seatNo": 1, "bookedSeat.user": 1 }
    )
      .populate("bookedSeat.user", "_id") // Only fetch user._id
      .lean();

    // 4. Transform data (handle null/undefined cases)
    const bookedSeats = bookings.flatMap((booking) =>
      (booking.bookedSeat || []).map((item) => ({
        seatNo: item.seatNo,
        userId: item.user?._id?.toString() || null, // Explicit fallback
      }))
    );

    // 5. Success response
    return NextResponse.json(
      { data: { bookedSeat: bookedSeats || [] } }, // Ensure array fallback
      { status: 200 }
    );

  } catch (error) {
    console.error("Error in get-booked-seats:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch booked seats",
        details: process.env.NODE_ENV === "development" ? error.message : null, // Hide details in prod
      },
      { status: 500 }
    );
  }
}