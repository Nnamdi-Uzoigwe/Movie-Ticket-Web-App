"use client"
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function ReceiptPage() {
    const searchParams = useSearchParams()
  
    const date = searchParams.get("date");
    const selectedCinema = searchParams.get("selectedCinema"); 
    const name = searchParams.get("name");
    const time = searchParams.get("time");
    const selectedSeats = searchParams.get("selectedSeats");
    const receiptRef = useRef(null);
  
    const router = useRouter()
    // Function to capture and download the receipt as an image
    const handleDownload = () => {
      const receiptElement = receiptRef.current;
      html2canvas(receiptElement).then((canvas) => {
        canvas.toBlob((blob) => {
          saveAs(blob, "Ticket_Receipt.png");
        });
      });
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Ticket Detail</h2>
      
            <div ref={receiptRef} className="border border-blue-400 p-4 rounded-lg mb-6">
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Date:</span> {date} 
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Cinema:</span> {selectedCinema}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Movie Title:</span> {name}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Ticket (3):</span> {selectedSeats}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Hours:</span> 14:40
              </p>
            </div>
    
            <button
              className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-green-600 mb-4"
              onClick={handleDownload}
            >
              Download Ticket
            </button>
    
            <button 
              className="border border-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg w-full hover:bg-gray-200"
              onClick={() => router.push('/home')}
            >
              Back to Homepage
            </button>
          </div>
        </div>
      );
}