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
  
      const booking = await Booking.findOne({ movieId }).populate("bookedSeat.user");
  
      if (!booking) {
        return NextResponse.json({ error: "No booking found for this movie" }, { status: 404 });
      }
  
      return NextResponse.json({ data: booking }, { status: 200 });
  
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }