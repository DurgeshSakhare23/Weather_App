import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Wind, Sunrise, Sunset } from 'lucide-react';
import { WeatherData } from '../types/weather';

interface WeatherDisplayProps {
  data: WeatherData;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data }) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 text-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold mb-2">{data.name}</h2>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt={data.weather[0].description}
              className="w-20 h-20"
            />
            <div>
              <p className="text-6xl font-bold">{Math.round(data.main.temp)}°C</p>
              <p className="text-xl capitalize">{data.weather[0].description}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Droplets className="w-6 h-6 text-blue-300" />
            <div>
              <p className="text-sm opacity-70">Humidity</p>
              <p className="text-xl font-semibold">{data.main.humidity}%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Wind className="w-6 h-6 text-blue-300" />
            <div>
              <p className="text-sm opacity-70">Wind Speed</p>
              <p className="text-xl font-semibold">{data.wind.speed} m/s</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Sunrise className="w-6 h-6 text-yellow-300" />
            <div>
              <p className="text-sm opacity-70">Sunrise</p>
              <p className="text-xl font-semibold">{formatTime(data.sys.sunrise)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Sunset className="w-6 h-6 text-orange-300" />
            <div>
              <p className="text-sm opacity-70">Sunset</p>
              <p className="text-xl font-semibold">{formatTime(data.sys.sunset)}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};