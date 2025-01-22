"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const SeatSelection = () => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const columns = Array.from({ length: 10 }, (_, i) => i + 1);
  const seatPrice = 18.95; // Price per seat
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeatSelection = (seat) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seat)
        ? prevSelectedSeats.filter((s) => s !== seat)
        : [...prevSelectedSeats, seat]
    );
  };

  const getTotalPrice = () => (selectedSeats.length * seatPrice).toFixed(2);

  return (
    <div className="min-h-screen  flex flex-col justify-center items-center text-white">
      <h1 className="text-4xl mb-10">Seat</h1>
      <div className="bg-white rounded-md p-8 shadow-lg">
        <div className="grid grid-cols-10 gap-2">
          {rows.map((row) =>
            columns.map((col) => {
              const seat = `${row}${col}`;
              const isSelected = selectedSeats.includes(seat);
              return (
                <button
                  key={seat}
                  className={`w-10 h-10 rounded-md ${
                    isSelected ? 'bg-green-500' : 'bg-gray-200'
                  } hover:bg-green-300 transition-colors duration-300`}
                  onClick={() => toggleSeatSelection(seat)}
                >
                  {seat}
                </button>
              );
            })
          )}
        </div>
        <div className="flex justify-center mt-8">
          <button className="bg-gray-300 rounded-md px-4 py-2">
            X
          </button>
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto mt-8 p-4 bg-black bg-opacity-50 rounded-md">
        <div className="flex justify-between items-center text-xl">
          <div className="text-lg">
            <span className="font-bold">TOTAL</span> <br />
            RM {getTotalPrice()}
          </div>
          <div className="text-lg">
            <span className="font-bold">SEAT</span> <br />
            {selectedSeats.join(', ') || 'None'}
          </div>
          <div className="space-x-4">
            <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors duration-300">
              Back
            </button>
            <Link href={"/detail"}>
              <button className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-md transition-colors duration-300">
                Proceed Payment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
