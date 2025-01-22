"use client"
import React, { useEffect, useState } from 'react'
import { IoLocationOutline } from "react-icons/io5";
import image1 from "@/assets/card1.svg"
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';


const MovieDetail = () => {
const [data, setData] = useState()

const {id} = useParams()

    const url = `https://imdb-top-100-movies.p.rapidapi.com/${id}`;
    const options = {
    method: 'GET',
    headers: {
    'x-rapidapi-key': '8d63ad786dmshc61c45ee50bcb6bp1502f0jsn70024eaebe76',
    'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
    }
    };


    useEffect(() => {
    const fetchData = async() => {

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error(error);
        }
        }

        fetchData()
    }, [])

const dateArray = [
    {
        date: "22-oct",
        day: "Mon"
    },
    {
        date: "23-oct",
        day: "Tue"
    },
    {
        date: "24-oct",
        day: "Wed"
    },
    {
        date: "25-oct",
        day: "Thur"
    },
    {
        date: "26-oct",
        day: "Fri"
    },
    {
        date: "27-oct",
        day: "Sat"
    },

]

const timeArray = ["15:40", "16:40", "17:40", "18:40"]




  return (
    <div className='text-white px-[6.944vw] py-[4vw] '>
        <div className='flex justify-between '>
            <div className=' flex flex-col gap-[4.94vw]'>
                <div className='flex flex-col gap-[1.5vw]'>
                    <p className='text-white text-[2.5vw] font-[600]'>Theater</p>
                    <div className=' flex gap-[1.11vw]'>
                        <div className='text-[1.39vw] border hover:bg-[#1DE782] cursor-pointer border-white w-fit flex items-center py-[0.625vw] px-[1.042vw] rounded-[2.71vw] gap-[0.9vw]'>
                            <IoLocationOutline  className='text-[1.5vw]'/>
                            <p>Bukit Bintang</p>
                        </div>
                        <div className='text-[1.39vw] border hover:bg-[#1DE782] cursor-pointer border-white w-fit flex items-center py-[0.625vw] px-[1.042vw] rounded-[2.71vw] gap-[0.9vw]'>
                            <IoLocationOutline  className='text-[1.5vw]'/>
                            <p>IOI Putrajaye</p>
                        </div>
                        <div className='text-[1.39vw] border hover:bg-[#1DE782] cursor-pointer border-white w-fit flex items-center py-[0.625vw] px-[1.042vw] rounded-[2.71vw] gap-[0.9vw]'>
                            <IoLocationOutline  className='text-[1.5vw]'/>
                            <p>KB Mall</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-[1.5vw]'>
                    <p className='text-white text-[2.5vw] font-[600]'>Date</p>
                    <div className='flex gap-[1.39vw]' >
                        {
                            dateArray.map((item, index) => (
                                <div key={index} className='flex flex-col justify-center rounded-[0.56vw] items-center w-[5.9vw] h-[5.9vw] border-[0.13vw] border-white cursor-pointer hover:bg-[#1DE782]'>
                                    <p className='text-[1.11vw]'>{item.date}</p>
                                    <p className='font-[900] text-[1.39vw]'>{item.day}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-[1.5vw]'>
                    <p className='text-white text-[2.5vw] font-[600]'>Time</p>
                    <div className='flex gap-[0.69vw]'>
                        {
                                timeArray.map((item, index) => (
                                    <div key={index} className='flex flex-col justify-center rounded-[0.56vw] items-center w-[5.3vw] h-[2.78vw] border-[0.13vw] border-white cursor-pointer hover:bg-[#1DE782]'>
                                        <p className='text-[1.11vw]'>{item}</p>
                                    </div>
                                ))
                            }

                    </div>
                </div>
            </div>

            <div className='w-[17.36vw] '> 
                <Image src={data?.image} width={250} height={375} alt="alt" className=' w-[17.36vw] h-[26.04vw]'/>
                <div className=' flex flex-col gap-[1vw] pt-[1vw]'>
                    <p className='text-[1.667vw] font-[600] '>{data?.title}</p>
                    <p>{data?.description}</p>
                    <div className='flex justify-between pr-[2vw] '>
                        <p>Duration</p>
                        <p>2h 30m</p>
                    </div>
                    <div className='flex justify-between pr-[2vw]'>
                        <p>Type</p>
                        <p>{data?.genre?.[0]}</p>
                    </div>
                </div>

            </div>
        </div>
        <div className='w-full  flex justify-end mt-[4vw]'>
            <div className='h-[22.57vw] w-[25.9vw] border-[0.069vw] border-white rounded-[1.39vw] flex flex-col px-[2.5vw] gap-[2vw] justify-center '>
                <div className='flex flex-col gap-[2vh]'>
                    <p className='text-[2.22vw] font-[600]'>IOI Putrajaye</p>
                    <div className='text-[1.528vw]'>
                        <p>28 October 2023</p>
                        <p>15:40</p>
                    </div>
                    <p>*Seat selection can be done after this</p>
                </div>
               <Link href={"/seatselector"} ><button className='h-[3.33vw] rounded-[0.8vw] bg-[#1DE782] w-full font-[600]'>Proceed</button></Link>
            </div>

        </div>

    </div>
  )
}

export default MovieDetail