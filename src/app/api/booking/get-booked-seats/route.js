
import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Booking from "../../../lib/models/booking";

export async function POST(req) {
  await connectDB();

  try {
    const { movieId } = await req.json();

    if (!movieId) {
      return NextResponse.json({ error: "movieId is required" }, { status: 400 });
    }


    const bookings = await Booking.find({ movieId }).populate("bookedSeat.user");

    if (!bookings || bookings.length === 0) {
      return NextResponse.json(
        { data: { bookedSeat: [] } }, 
        { status: 200 }
      );
    }

    const bookedSeats = bookings.flatMap(booking => 
      booking.bookedSeat.map(item => ({
        seatNo: item.seatNo,
        userId: item.user?._id?.toString() 
      }))
    );

    return NextResponse.json(
      { 
        data: { 
          bookedSeat: bookedSeats 
        } 
      }, 
      { status: 200 }
    );

  } catch (error) {
    console.error("Error in get-booked-seats:", error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}