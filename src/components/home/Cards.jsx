"use client";

import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { myMovieList } from '@/store/atom/movielist';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Cards = () => {
  const [movie] = useRecoilState(myMovieList);
  const [loadingId, setLoadingId] = useState(null);
  const router = useRouter();

  const handleMovieClick = (id) => {
    setLoadingId(id);
    router.push(`/movie/${id}`);
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[3.083vw] px-20'>
      {movie !== null &&
        movie.map((item) => (
          <div key={item.id} className="relative group">
            <div 
              onClick={() => handleMovieClick(item.id)}
              className='flex flex-col items-center gap-[0.903vw] cursor-pointer'
            >
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={250}
                  height={375}
                  className="transition-opacity group-hover:opacity-80"
                />
                {loadingId === item.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-8 h-8 border-4 border-t-green-500 border-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              <p className='text-white font-[1.389vw]'>{item.title}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Cards;