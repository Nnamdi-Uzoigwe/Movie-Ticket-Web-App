"use client";

import Cards from '@/components/home/Cards';
import { myMovieList } from '@/store/atom/movielist';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const Home = () => {
  const [movie, setMovie] = useRecoilState(myMovieList);

  const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '8d63ad786dmshc61c45ee50bcb6bp1502f0jsn70024eaebe76',
      'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json(); // Parse JSON response instead of text
        setMovie(result.slice(0, 12));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call fetchData without including it in the dependency array

  }, []); // Corrected dependency array

  return (
    <div className='flex flex-col items-center h-[100vh] overflow-x-hidden'>
      <div className='font-[700] text-white text-[3.19vw]'>
        NOW SHOWING
      </div>
      <Cards />
    </div>
  );
}

export default Home;
