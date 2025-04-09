"use client"

import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const HomePage = () => {
  // Server-side logic to decide if redirect is needed
  const shouldRedirect = true; // Replace with your logic
  const router = useRouter()

  if (shouldRedirect) {
    redirect('/auth/login');
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token")

    if(!token) {
      router.push('/auth/login')
    }
  }, [])

  return <div>Welcome to the Home Page</div>; // This won't render if redirected
};

export default HomePage;
