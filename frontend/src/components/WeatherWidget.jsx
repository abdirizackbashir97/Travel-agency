import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets } from 'lucide-react';

const WeatherWidget = ({ destination }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const weatherData = {
    'Paris': { temp: 18, condition: 'Cloudy', humidity: 70, wind: 8 },
    'Dubai': { temp: 35, condition: 'Sunny', humidity: 45, wind: 12 },
    'Bali': { temp: 28, condition: 'Partly Cloudy', humidity: 80, wind: 10 },
    'Maldives': { temp: 30, condition: 'Sunny', humidity: 75, wind: 15 },
    'Tokyo': { temp: 22, condition: 'Rainy', humidity: 85, wind: 5 },
    'New York': { temp: 20, condition: 'Sunny', humidity: 55, wind: 14 },
    'London': { temp: 15, condition: 'Cloudy', humidity: 78, wind: 10 },
    'Istanbul': { temp: 25, condition: 'Sunny', humidity: 50, wind: 8 },
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const data = weatherData[destination] || weatherData['Dubai'];
      setWeather(data);
      setLoading(false);
    }, 500);
  }, [destination]);

  const getWeatherIcon = (condition) => {
    switch(condition) {
      case 'Sunny': return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'Cloudy': return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'Rainy': return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'Partly Cloudy': return <Cloud className="w-8 h-8 text-gray-400" />;
      default: return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getWeatherIcon(weather.condition)}
          <div>
            <p className="text-2xl font-bold text-gray-900">{weather.temp}°C</p>
            <p className="text-sm text-gray-500">{weather.condition}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Droplets className="w-4 h-4" />
            <span>{weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Wind className="w-4 h-4" />
            <span>{weather.wind} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
