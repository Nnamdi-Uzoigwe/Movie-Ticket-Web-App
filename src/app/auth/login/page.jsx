"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [signup, setSignup] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    const data = {
      email: email,
      password: password
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'; // Default to localhost in development

    try {
      const res = await fetch(`${apiUrl}/api/${signup ? "register" : "login"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const response = await res.json();

      if (res.status === 200) {
        // If it's a login request
        if (!signup) {
          // Store the JWT token in localStorage upon successful login
          if (response.token) {
            localStorage.setItem("token", response.token);
            console.log('Login successful, token stored in localStorage.');
          }
          window.location.href = "/home";
        } else {
          setSignup(false);
        }

        console.log(response);
      } else {
        setError(response.error);
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-green-900'>
      <p className='text-white mb-4 text-xl'>Welcome to <span className='text-green-500'>Vilancy </span>Movie Ticket Platform!</p>
      <div className='bg-white w-[90%] max-w-[400px] p-6 rounded-lg shadow-md'>
        <h2 className='text-xl font-bold mb-4'>
          {signup ? "Create an Account" : "Login to your account"}
        </h2>

        {error && <p className='text-red-600 text-sm italic mb-3'>{error}</p>}

        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            className='w-full px-3 py-2 border rounded-md outline-none border-gray-300'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            className='w-full px-3 py-2 border rounded-md outline-none border-gray-300'
          />
        </div>

        <button
          onClick={handleSubmit}
          className='w-full bg-[#1DE782] text-white py-2 rounded-md font-semibold hover:bg-green-500 transition-colors'
        >
          {signup ? "Register Now" : "Login Now"}
        </button>

        <p className='text-center text-sm text-gray-600 mt-4'>
          {signup ? "Already have an account?" : "Don't have an account?"}
          <span
            onClick={() => setSignup(!signup)}
            className='text-[#1DE782] ml-1 cursor-pointer font-medium'
          >
            {signup ? "Login" : "Register"}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login
