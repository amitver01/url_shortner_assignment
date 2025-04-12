// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ShortenerForm from "./components/ShortenerForm";
import Analytics from "../src/pages/Analytics"; // we'll create this next

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <nav className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">🔗 URL Shortener</h1>
          <div className="space-x-4">
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
            <Link to="/analytics" className="text-blue-600 hover:underline">Analytics</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<ShortenerForm />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
