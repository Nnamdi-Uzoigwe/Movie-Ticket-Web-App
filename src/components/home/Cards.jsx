import React from 'react';
import { useRecoilState } from 'recoil';
import { myMovieList } from '@/store/atom/movielist';
import Image from 'next/image';
import Link from 'next/link';

const Cards = () => {
  const [movie, setMovie] = useRecoilState(myMovieList);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[3.083vw] px-20'>
      {movie !== null &&
        movie.map((item) => (
          <div key={item.id}>
            <Link href={`/movie/${item.id}`}>
              <div className='flex flex-col items-center gap-[0.903vw]'>
                <Image
                  src={item.image}
                  alt='alt'
                  width={250}
                  height={375}
                />
                <p className='text-white font-[1.389vw]'>{item.title}</p>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Cards;
