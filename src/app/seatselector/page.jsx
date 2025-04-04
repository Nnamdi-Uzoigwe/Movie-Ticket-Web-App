"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import user from '../lib/models/user';


const SeatSelection = () => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const columns = Array.from({ length: 10 }, (_, i) => i + 1);
  const seatPrice = 3000;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const searchParams = useSearchParams();
  const [error, setError] = useState("")
  
  const date = searchParams.get("date");
  const selectedCinema = searchParams.get("selectedCinema"); 
  const name = searchParams.get("name");
  const time = searchParams.get("time");
  const id  = searchParams.get("id")
  
  const toggleSeatSelection = (seat) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seat)
        ? prevSelectedSeats.filter((s) => s !== seat)
        : [...prevSelectedSeats, seat]
    );
  };


  
  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      console.log("Please select at least one seat.");
      setError("Please select at least one seat.");
      return;
    }
  
    try {

      console.log("movieId:", id); 
      
      console.log("bookedSeats:", selectedSeats); 
      const getResponse = await fetch("/api/booking/get-booked-seats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId: id }),
      });
  
      const getData = await getResponse.json();
      const alreadyBookedSeats = getData?.data?.bookedSeat?.map(seat => seat.seatNo) || [];
  
      const conflict = selectedSeats.some(seat => alreadyBookedSeats.includes(seat));
  
      if (conflict) {
        setError("Some of the seats you selected have already been booked. Please refresh and try again.");
        return;
      }

      const bookResponse = await fetch("/api/booking/book-seats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieId: id,
          userId: user._id,
          bookedSeats: selectedSeats,
        }),
      });
  
      const bookData = await bookResponse.json();
  
      if (!bookResponse.ok) {
        console.log(bookData.error || "Booking failed.");
        setError(bookData.error || "Booking failed.")
        return;
      }
  
      router.push(
        `/detail?total=${(selectedSeats.length * seatPrice).toFixed(
          2
        )}&selectedCinema=${encodeURIComponent(selectedCinema)}&name=${encodeURIComponent(
          name
        )}&time=${time}&date=${date}&selectedSeats=${selectedSeats.join(",")}`
      );
    } catch (error) {
      console.error("Booking error:", error);
      setError(error)
      console.log("An error occurred. Please try again.");
    }
  };
  
  const handleCancelLastSeat = () => {
    const updatedSeats = selectedSeats.slice(0, -1); 
    setSelectedSeats(updatedSeats);
  }


let total;
  const getTotalPrice = () =>{
    const value = (selectedSeats.length * seatPrice).toFixed(2);
    total =value
    return value
  } 
  const router = useRouter()

  function handlePush() {
    router.push(`/movie/${id}`)
  }
  return (
    <div className="min-h-screen flex flex-col items-center text-white px-4 py-8">
      <div className='mb-4'>
        <p className='text-xl md:text-2xl'>Movie Selected: <span className="text-green-500">{name}</span></p>
        <p className='text-xl md:text-2xl'>Date: <span className="text-green-500">{date}</span></p>
        <p className='text-xl md:text-2xl'>Time showing: <span className='text-green-500'>{time}</span></p>
      </div>
      <h1 className="text-3xl md:text-4xl mb-6">Seat Selection</h1>
      
      <div className="bg-white rounded-md p-6 shadow-lg w-full max-w-lg sm:max-w-xl md:max-w-2xl">
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 justify-center">
          {rows.map((row) =>
            columns.map((col) => {
              const seat = `${row}${col}`;
              const isSelected = selectedSeats.includes(seat);
              return (
                <button
                  key={seat}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md text-xs sm:text-sm ${
                    isSelected ? 'bg-green-500' : 'bg-gray-300'
                  } hover:bg-green-400 transition-colors duration-300`}
                  onClick={() => toggleSeatSelection(seat)}
                >
                  {seat}
                </button>
              );
            })
          )}
        </div>
        
        <div className="flex justify-center mt-6">
          <button 
            className="bg-gray-500 hover:bg-gray-400 text-white rounded-md px-4 py-2"
            onClick={handleCancelLastSeat}
          >
            X
          </button>
        </div>
      </div>

      <div className="w-full max-w-4xl mt-8 p-4 bg-black bg-opacity-50 rounded-md text-center sm:text-left">
        <div className="flex flex-col sm:flex-row justify-between items-center text-lg gap-4">
          <div>
            <span className="font-bold">TOTAL</span> <br /> ₦ {getTotalPrice()}
          </div>
          <div>
            <span className="font-bold">SEAT</span> <br /> {selectedSeats.join(', ') || 'None'}
          </div>
          <div className="flex space-x-2">
            <button onClick={handlePush} className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors duration-300">
              Back
            </button>
              <button 
                className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-md transition-colors duration-300"
                onClick={handleBooking}
              >
                Proceed Payment
              </button>
          </div>
              <p className="text-red-500 font-semibold">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;