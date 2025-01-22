import Link from "next/link";
import React from "react";

function BookingDetail() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Booking Detail</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Schedule</h3>
          <p className="text-gray-600">
            <span className="font-bold">Movie Title:</span> SPIDERMAN NO WAY HOME
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Date:</span> Mon, 23 Oct 2023
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Ticket (3):</span> C8, C9, C10
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Hours:</span> 14:40
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold">Transaction Detail</h3>
          <div className="flex justify-between text-gray-600">
            <span>REGULAR SEAT</span>
            <span>RM 55.70 x3</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Service Charge (6%)</span>
            <span>RM 3.30 x3</span>
          </div>
          <div className="border-t border-gray-300 my-2"></div>
          <div className="flex justify-between text-black font-bold">
            <span>Total payment</span>
            <span>RM 62.10</span>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          *Purchased ticket cannot be canceled
        </div>

        <Link href={'/receipt'}> <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-green-600">
          Checkout Ticket
        </button>
        </Link>
      </div>
    </div>
  );
}

export default BookingDetail;
