/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import SuccessMessage from './components/SuccessMessage';
import FloatingHearts from './components/FloatingHearts';
import FloatingEmailForm from './components/FloatingEmailForm';

function App() {
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleYesClick = async () => {
    setLoading(true);
    
    try {
      // You can customize the recipient and message here
      // Ideally, these could also be environment variables or user inputs if extended
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'sandhyanaga44@gmail.com', // Replace with the actual recipient email
          subject: 'He said YES! 💍❤️',
          message: 'I said YES! 💖 Let\'s be Valentines forever!'
        }),
      });
      
      const data = await response.json();
      console.log('Email sent status:', data);
    } catch (error) {
      console.error('Failed to send email:', error);
      // We still proceed to success screen even if email fails, 
      // so we don't ruin the user experience
    } finally {
      setLoading(false);
      setAccepted(true);
    }
  };

  return (
    <div className="font-sans min-h-screen bg-pink-100">
      <FloatingHearts />
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500 mb-4"></div>
          <p className="text-xl text-red-500 font-semibold animate-pulse">Sending your love... 💌</p>
        </div>
      ) : accepted ? (
        <SuccessMessage />
      ) : (
        <LandingPage onYes={handleYesClick} />
      )}
      <FloatingEmailForm />
    </div>
  );
}

export default App;
