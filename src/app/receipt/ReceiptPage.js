"use client"
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { useSearchParams, useRouter } from "next/navigation";

export default function ReceiptPage() {
    const searchParams = useSearchParams()
  
    const date = searchParams.get("date");
    const selectedCinema = searchParams.get("selectedCinema"); 
    const name = searchParams.get("name");
    const time = searchParams.get("time");
    const selectedSeats = searchParams.get("selectedSeats");
    const [isDownloading, setIsDownloading] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const receiptRef = useRef(null);
  
    const router = useRouter()

    const handleDownload = async () => {
      setIsDownloading(true);
      try {
        const receiptElement = receiptRef.current;
        const canvas = await html2canvas(receiptElement);
        canvas.toBlob((blob) => {
          saveAs(blob, "Ticket_Receipt.png");
        });
      } catch (error) {
        console.error("Download failed:", error);
      } finally {
        setIsDownloading(false);
      }
    };

    
    const handleNavigateHome = () => {
      setIsNavigating(true);
      router.push('/home');
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
                onClick={handleDownload}
                disabled={isDownloading}
                className={`bg-green-500 text-white font-bold py-2 px-4 rounded-lg w-full mb-4 flex items-center justify-center gap-2 ${
                  isDownloading ? 'opacity-75' : 'hover:bg-green-600'
                }`}
            >
                {isDownloading ? (
                  <>
                    <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Downloading...
                  </>
                ) : (
                  'Download Ticket'
                )}
            </button>
            <button 
              onClick={handleNavigateHome}
              disabled={isNavigating}
              className={`border border-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg w-full flex items-center justify-center gap-2 ${
                isNavigating ? 'opacity-75' : 'hover:bg-gray-200'
              }`}
            >
              {isNavigating ? (
                <>
                  <span className="inline-block h-5 w-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></span>
                  Redirecting...
                </>
              ) : (
                'Back to Homepage'
              )}
            </button>
          </div>
        </div>
      );
}