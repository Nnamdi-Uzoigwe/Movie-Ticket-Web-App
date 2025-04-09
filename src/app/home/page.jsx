"use client";

import Cards from '@/components/home/Cards';
import { myMovieList } from '@/store/atom/movielist';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';

const Home = () => {
  const [movie, setMovie] = useRecoilState(myMovieList);
  const router = useRouter()
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    console.log(token);
    if(!token) {
      setShowError(true)

      const timer = setTimeout(() => {
        router.push('/auth/login')
      }, 2000)

      return () => clearTimeout(timer)
    }
    
    const fetchMovies = async() => {
      try {
        const res = await fetch("/movie-data.json");
        const data = await res.json();
  
        setMovie(data);
        
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }

  fetchMovies();
  }, [])

  if (showError) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-12">
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
    <div className='flex flex-col items-center h-[100vh] overflow-x-hidden'>
      <div className='font-[700] text-white text-[3.19vw] mb-4'>
        NOW SHOWING
      </div>
      <Cards />
    </div>
  );
}

export default Home;
