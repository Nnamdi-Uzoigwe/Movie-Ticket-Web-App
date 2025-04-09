
"use client";
import React, { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const MovieDetail = () => {
  const [data, setData] = useState(null);
  const [dateArray, setDateArray] = useState([]);
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showError, setShowError] = useState(false);

  const handleSetDate = (selectedDate) => {
    setSelectedDate(selectedDate);
  };

  const handleSetTime = (selectedTime) => {
    setSelectedTime(selectedTime)
  }

  useEffect(() => {

    const token = sessionStorage.getItem("token")

    if(!token) {
      setShowError(true)

      const timer = setTimeout(() => {
        router.push('/auth/login')
      }, 2000)

      return () => clearTimeout(timer)
    }

    const fetchData = async () => {
      try {
        const response = await fetch("/movie-data.json");
        const result = await response.json();
        const movie = result.find((item) => item.id === id);

        if (movie) {
          setData(movie);
        } else {
          console.error("Movie not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) fetchData();
  }, [id]);

  useEffect(() => {
    const getNextFiveDays = () => {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const today = new Date();
      const dates = [];

      for (let i = 0; i < 5; i++) {
        const nextDate = new Date();
        nextDate.setDate(today.getDate() + i);

        const date = nextDate.getDate();
        const month = months[nextDate.getMonth()];
        const day = days[nextDate.getDay()];

        dates.push({
          date: `${date}-${month}`,
          day: day,
        });
      }

      setDateArray(dates);
    };

    getNextFiveDays();
  }, []);

  const timeArray = ["15:40", "16:40", "17:40", "18:40"];

  const now = new Date();

  const formattedDate = now.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  function handleSetCinema(cinema) {
    setSelectedCinema(cinema)
  }

  const isSelectionComplete = selectedCinema && selectedDate && selectedTime;

  
  const handleProceed = (e) => {
    e.preventDefault();
    if (!isSelectionComplete) return;
    
    setIsLoading(true);
    router.push(
      `/seatselector/?date=${selectedDate?.date}&selectedCinema=${selectedCinema}&name=${data?.title}&time=${selectedTime}&id=${data?.imdbid}`
    );
  };

  if (showError) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Unauthorized Access</h2>
          <p className="text-gray-700 mb-4">
            Please login to access this page. Redirecting to login...
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-500 h-2.5 rounded-full animate-progress" 
              style={{ animationDuration: '2s' }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white p-6 md:p-12 lg:p-20">
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="flex flex-col w-full lg:w-2/3 space-y-6">
          <div>
            <p className="text-lg font-semibold mb-2">Theaters/Cinemas</p>
            <div className="flex flex-wrap gap-3">
              {data?.cinemas?.map((cinema, index) => (
                <div
                  key={index}
                  onClick={() => handleSetCinema(cinema)}
                  className={`text-sm md:text-lg border border-white p-2 rounded-md ${selectedCinema === cinema ? "bg-[#1DE782]" : "bg-transparent"} cursor-pointer flex items-center gap-1`}
                >
                  <IoLocationOutline className="text-lg" />
                  <p>{cinema}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold mb-2">Date</p>
            <div className="flex flex-wrap gap-3">
              {dateArray.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleSetDate(item)}
                  className={`flex flex-col ${selectedDate === item ? "bg-[#1DE782]" : "bg-transparent"} justify-center items-center border border-white p-2 rounded-md cursor-pointer`}
                >
                  <p className="text-sm md:text-lg">{item.date}</p>
                  <p className="font-bold text-sm md:text-lg">{item.day}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold mb-2">Time</p>
            <div className="flex flex-wrap gap-3">
              {timeArray.map((time, index) => (
                <div
                  key={index}
                  onClick={() => handleSetTime(time)}
                  className={`flex justify-center items-center border border-white p-2 rounded-md cursor-pointer ${selectedTime === time ? "bg-[#1DE782]" : "bg-transparent"}`}
                >
                  <p className="text-sm md:text-lg">{time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3 flex flex-col items-center">
          <Image
            src={data?.image || "/placeholder-image.jpg"}
            width={250}
            height={375}
            alt={data?.title || "Movie Image"}
            className="rounded-lg"
          />
          <div className="mt-4 text-center">
            <p className="font-semibold text-xl">{data?.title}</p>
            <p className="text-gray-300">{data?.description}</p>
            <div className="flex justify-between w-full mt-2">
              <p className="text-gray-400">Rating</p>
              <p className="text-gray-200">{data?.rating}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-gray-400">Type</p>
              <p className="text-gray-200">{data?.genre?.[0]}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end mt-6">
        <div className="border border-white p-6 rounded-lg flex flex-col gap-4 w-full md:w-1/3">
          <div>
            <p className="font-semibold text-lg">{selectedCinema}</p>
            <p className="text-gray-400">{selectedDate?.date || formattedDate}</p>
            <p className="text-gray-400">{selectedTime}</p>
            <p className="text-xs text-gray-400 mt-2">
              *Seat selection can be done after this
            </p>
          </div>
          <button
            onClick={handleProceed}
            disabled={!isSelectionComplete || isLoading}
            className={`rounded-md bg-[#1DE782] w-full font-semibold p-2 flex items-center justify-center ${
              !isSelectionComplete || isLoading ? "opacity-50" : "hover:bg-green-600 transition-colors"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Processing...
              </span>
            ) : (
              "Proceed"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
