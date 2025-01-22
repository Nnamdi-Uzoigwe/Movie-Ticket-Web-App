"use client"
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

function TicketDetail() {
  const receiptRef = useRef(null);

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
        <h2 className="text-2xl font-bold mb-4">Ticket Detail</h2>
        
        {/* Ref is used to target the receipt for screenshot */}
        <div ref={receiptRef} className="border border-blue-400 p-4 rounded-lg mb-6">
          <p className="text-gray-600 mb-2">
            <span className="font-bold">Date:</span> Mon, 23 Oct 2023
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-bold">Movie Title:</span> SPIDERMAN NO WAY HOME
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-bold">Ticket (3):</span> C8, C9, C10
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

        <button className="border border-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg w-full hover:bg-gray-200">
          Back to Homepage
        </button>
      </div>
    </div>
  );
}

export default TicketDetail;
