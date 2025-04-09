
"use client"
import React, { useState, useEffect } from 'react'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [signup, setSignup] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)


  useEffect(() => {
    
    const timer = setTimeout(() => {
      setInitialLoading(false)
    }, 2000) 

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    setError("")
    
    const data = { email, password }
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  
    try {
      const res = await fetch(`${apiUrl}/api/${signup ? "register" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })

      const text = await res.text()
      const response = text ? JSON.parse(text) : {}

      if (res.ok) {
        if (!signup) {
          if (response.token) {
            localStorage.setItem("token", response.token)
          }
          window.location.href = "/home"
        } else {
          console.log("Registration successful! Please login.")
          setSignup(false)
          setEmail("")
          setPassword("")
        }
      } else {
        setError(response.error || "Something went wrong")
      }
    } catch (error) {
      console.error(error)
      setError("Network error - please try again")
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-black to-green-900">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-green-500 border-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white text-lg">Loading <span className="text-green-500">Vilancy</span> Movie Ticket Platform...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-green-900'>
      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-12 h-12 border-4 border-t-green-500 border-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <p className='text-white mb-4 text-xl relative z-10'>
        Welcome to <span className='text-green-500'>Vilancy</span> Movie Ticket Platform!
      </p>
      
      <div className='bg-white w-[90%] max-w-[400px] p-6 rounded-lg shadow-md relative z-10'>
        <h2 className='text-xl font-bold mb-4'>
          {signup ? "Create an Account" : "Login to your account"}
        </h2>

        {error && (
          <p className='text-red-600 text-sm italic mb-3'>
            {error}
          </p>
        )}

        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            className='w-full px-3 py-2 border rounded-md outline-none border-gray-300'
            disabled={loading}
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
            disabled={loading}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full bg-[#1DE782] text-white py-2 rounded-md font-semibold transition-colors flex justify-center items-center gap-2 ${
            loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-500'
          }`}
        >
          {loading ? (
            <>
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              Processing...
            </>
          ) : signup ? "Register Now" : "Login Now"}
        </button>

        <p className='text-center text-sm text-gray-600 mt-4'>
          {signup ? "Already have an account?" : "Don't have an account?"}
          <span
            onClick={() => !loading && setSignup(!signup)}
            className={`text-[#1DE782] ml-1 font-medium ${
              loading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
            }`}
          >
            {signup ? "Login" : "Register"}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login