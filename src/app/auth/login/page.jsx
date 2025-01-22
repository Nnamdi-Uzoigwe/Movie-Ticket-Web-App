import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
        <div className='bg-white w-[44.1vw] h-[36.39vw]  flex flex-col items-center justify-center rounded-[0.694vw]'>
            <div className=' text-[2.08vw] font-[600] text-left'>
                Login to your account
            </div>

            <div className='text-[1.11vw] flex flex-col gap-[1.83vw] '>
                <div className='font-[400] flex flex-col gap-[1.83vw]'>
                    <div className='flex flex-col gap-[0.83vw]'>
                        <label>Username</label>
                        <input placeholder='Enter your Username' type="text" className='w-[37.99vw] outline-none border border-[#BEBEBF] h-[3.33vw] rounded-[0.556vw] px-[1.1vw]' />
                    </div>
                    <div className='flex flex-col gap-[0.83vw]'>
                        <label>Password</label>
                        <input placeholder='Enter your Password' type="password" className='w-[37.99vw] outline-none border border-[#BEBEBF] h-[3.33vw] rounded-[0.556vw] px-[1.1vw]'/>
                    </div>
                </div>

                <div>
                    <Link href={"/home"}>
                        <button className='w-[37.99vw] h-[3.33vw] bg-[#1DE782] text-white rounded-[0.556vw] font-[600]'>Login Now</button>
                    </Link>
                </div>
            </div>
            <div className='pt-[1.1vw]'>
                <p className='text-[#BEBEBF]'>Don't have an Account? <span className=' text-[#1DE782] cursor-pointer'>Register</span></p>
            </div>
        </div>
    </div>
  )
}

export default Login