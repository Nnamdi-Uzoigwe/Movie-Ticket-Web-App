"use client";

import Cards from '@/components/home/Cards';
import { myMovieList } from '@/store/atom/movielist';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const Home = () => {
  const [movie, setMovie] = useRecoilState(myMovieList);

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log(token);
    
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
