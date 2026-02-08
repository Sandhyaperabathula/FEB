/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const FloatingEmailForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus(null);

    try {
      console.log('Sending email to:', email);
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: 'A Special Message For You ❤️',
          message: 'Happy Valentine\'s Day! You are loved and appreciated. 🌹💖'
        }),
      });

      console.log('Response status:', response.status);
      
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // If not JSON (e.g., 404 HTML page), treat as error
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error(`API Endpoint not found or server error (${response.status})`);
      }

      if (response.ok) {
        console.log('Email sent successfully:', data);
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus(null), 3000);
      } else {
        console.error('Server error:', data);
        setStatus('error');
        alert(`Failed to send email: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Network/Client error:', error);
      setStatus('error');
      alert('Failed to connect to the server. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white p-4 rounded-xl shadow-2xl border-2 border-pink-200 w-72 transition-all hover:scale-105">
        <h3 className="text-pink-600 font-bold mb-2 text-sm">Send some love 💌</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email to send love 💌"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg text-white font-semibold text-sm transition-colors ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-pink-500 hover:bg-pink-600'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Sending...
              </span>
            ) : (
              'Send ❤️'
            )}
          </button>
        </form>
        
        {status === 'success' && (
          <p className="mt-2 text-green-500 text-xs font-semibold text-center animate-bounce">
            Email sent successfully! 🚀
          </p>
        )}
        
        {status === 'error' && (
          <p className="mt-2 text-red-500 text-xs font-semibold text-center">
            Failed to send. Try again! 😢
          </p>
        )}
      </div>
    </div>
  );
};

export default FloatingEmailForm;
