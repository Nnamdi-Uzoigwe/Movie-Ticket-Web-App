
import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Booking from "../../../lib/models/booking";

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { movieId, userId, bookedSeats } = body;

    if (!movieId || !userId || !Array.isArray(bookedSeats) || bookedSeats.length === 0) {
      return NextResponse.json({ error: "movieId, userId, and bookedSeats[] are required" }, { status: 400 });
    }

    const seatEntries = bookedSeats.map(seat => ({
      user: userId,  
      seatNo: seat
    }));

    const updatedBooking = await Booking.findOneAndUpdate(
      { movieId },
      { $push: { bookedSeat: { $each: seatEntries } } },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      message: "Seats booked successfully",
      updatedBooking
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
