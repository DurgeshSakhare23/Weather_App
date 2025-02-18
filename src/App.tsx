import React, { useState } from 'react';
import axios from 'axios';
import { Cloud, AlertCircle, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { SearchBar } from './components/SearchBar';
import { WeatherDisplay } from './components/WeatherDisplay';
import { WeatherData } from './types/weather';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = '0d541b272057dc99295e6169222d3437';
  
  const fetchWeather = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Compass className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-semibold text-white tracking-wide">WeatherScope</span>
          </motion.div>
        </div>
      </nav>

      {/* Main Content */}
      <main 
        className="relative min-h-screen overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2000&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6 mb-12"
          >
            <div className="inline-flex items-center justify-center gap-3">
              <Cloud className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                WeatherScope
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-white/80 font-medium max-w-2xl mx-auto">
              Your Real-Time Weather Companion
            </p>
          </motion.div>

          <div className="max-w-xl mx-auto">
            <SearchBar onSearch={fetchWeather} />
          </div>

          {loading && (
            <div className="text-center mt-8">
              <div className="inline-block w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 mt-8 text-red-300"
            >
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </motion.div>
          )}

          {weather && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <WeatherDisplay data={weather} />
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;