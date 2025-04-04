import React from 'react'
import { cardsArray } from './Array'
import Image from 'next/image'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import { myMovieList } from '@/store/atom/movielist'


const Cards = () => {
  const [movie, setMovie] = useRecoilState(myMovieList)


  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[3.083vw] px-20'>
      { movie !== null && (
        movie.map((item) => (
          <Link href={`/movie/${item.id}`}>
            <div key={item.id} className='flex flex-col items-center gap-[0.903vw]'>
                <Image 
                  src={item.image} 
                  alt='alt' 
                  width={250} 
                  height={375} 
                  // className='w-[17.35vw] h-[26.0417vw] hover:opacity-[70%] cursor-pointer'

                />
                <p className='text-white font-[1.389vw]'>{item.title}</p>
            </div>
          
          </Link>

        ))
      )
      }
    </div>
  )
}

export default Cards
