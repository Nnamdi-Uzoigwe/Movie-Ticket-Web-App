import React from "react";

function PaymentSuccess() {
  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Payment Success</h2>

        <div className="mb-6">
          <div className="flex items-center justify-center bg-green-100 rounded-full w-24 h-24 mx-auto">
            <svg
              className="w-12 h-12 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2l4-4"
              />
            </svg>
          </div>
        </div>

        <div className="mb-4">
          <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-green-600 mb-2">
            View Ticket
          </button>
          <button className="border border-gray-300 text-white font-bold py-2 px-4 rounded-lg w-full hover:text-black hover:bg-gray-200">
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
