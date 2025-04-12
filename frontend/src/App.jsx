import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ShortenerForm from "./components/ShortenerForm";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <nav className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">🔗 URL Shortener</h1>
          <div className="space-x-4">
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </div>
        </nav>

        <Routes>
          {/* Home Page Route */}
          <Route 
            path="/" 
            element={
              <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                  <h2 className="text-4xl font-bold mb-4">Welcome to the URL Shortener</h2>
                  <Link 
                    to="/login" 
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Login
                  </Link>
                </div>
              </div>
            } 
          />
          
          {/* Other Routes */}
          <Route path="/shortner" element={<ShortenerForm />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
