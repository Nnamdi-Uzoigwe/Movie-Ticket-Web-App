"use client"
import Link from "next/link";
import React from "react";
import { useSearchParams } from "next/navigation";
function BookingDetail() {
  const searchParams = useSearchParams()

const date = searchParams.get("date");
const selectedCinema = searchParams.get("selectedCinema"); 
const name = searchParams.get("name");
const time = searchParams.get("time");
const selectedSeatsParam = searchParams.get("selectedSeats");

const selectedSeats = selectedSeatsParam ? selectedSeatsParam.split(",") : [];
const seatCount = selectedSeats.length;
const seatPrice = 3000;
const totalPrice = seatCount * seatPrice;
const finalPayment = (totalPrice * 0.04) + totalPrice



  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Booking Detail</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Schedule</h3>
          <p className="text-gray-600">
            <span className="font-bold">Cinema:</span> {selectedCinema}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Movie Title:</span> {name}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Date:</span> {date}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Selected Seats:</span> {selectedSeats.join(', ')}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Time:</span> {time}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold">Transaction Detail</h3>
          <div className="flex justify-between text-gray-600">
            <span>REGULAR SEAT</span>
            <span>₦ 3000 * {selectedSeats.length}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Service Charge (4%)</span>
            <span>₦ {(totalPrice * 0.04)} </span>
          </div>
          <div className="border-t border-gray-300 my-2"></div>
          <div className="flex justify-between text-black font-bold">
            <span>Total payment</span>
            <span>₦ {finalPayment}</span>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          *Purchased ticket cannot be canceled
        </div>

        <Link href={`/receipt/?total=${(selectedSeats.length * seatPrice).toFixed(2)}&selectedCinema=${selectedCinema}&name=${name}&time=${time}&date=${date}&selectedSeats=${selectedSeats.join(',')}`}>
          <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-green-600">
            Checkout Ticket
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BookingDetail;

