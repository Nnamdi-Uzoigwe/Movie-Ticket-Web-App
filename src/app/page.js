import { redirect } from 'next/navigation';

const HomePage = () => {
  // Server-side logic to decide if redirect is needed
  const shouldRedirect = true; // Replace with your logic

  if (shouldRedirect) {
    redirect('/auth/login');
  }

  return <div>Welcome to the Home Page</div>; // This won't render if redirected
};

export default HomePage;
