import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function URLShortener() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const token = Cookies.get('token');
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    
    try {
      // Get token from cookie
  
      const token = Cookies.get('token');
      // Add token to request headers
      console.log(token);
      const response = await axios.post(
        'http://localhost:5000/api/url/create',
        { url: originalUrl },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      setShortUrl(`http://localhost:5000/${response.data.id}`);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setError('Not authorized. Please log in again.');
        // Redirect to login after a short delay
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError('Failed to shorten URL');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">🔗 URL Shortener</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            placeholder="Enter your URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Shorten
          </button>
        </form>
        {shortUrl && (
          <div className="mt-4 text-center">
            <p className="text-green-600 font-semibold">Shortened URL:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
              {shortUrl}
            </a>
          </div>
        )}
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default URLShortener;