
import React from 'react';
import { WeatherData } from '../../types';

interface WeatherTabProps {
  weatherData: WeatherData | null;
}

const WeatherTab: React.FC<WeatherTabProps> = ({ weatherData }) => {
  if (!weatherData) {
    return <div className="text-center p-12 frosted-card rounded-2xl">Loading weather data...</div>;
  }
  
  return (
    <div className="frosted-card rounded-2xl p-8 shadow-[var(--app-shadow)] animate-fade-in-up">
      <h2 className="text-3xl font-bold text-[var(--app-text-primary)] mb-6 flex items-center gap-3">
        <span className="text-4xl">🌦️</span>
        5-Day Weather Forecast
      </h2>

      <div className="grid md:grid-cols-5 gap-4">
        {weatherData.forecast.map((day, i) => (
          <div
            key={i}
            className={`rounded-2xl p-6 border-2 transition-all backdrop-blur-sm ${
              day.ideal
                ? 'bg-green-500/10 border-green-200/50'
                : 'bg-red-500/10 border-red-200/50'
            }`}
          >
            <div className="text-center mb-3">
              <div className="text-sm font-semibold text-[var(--app-text-secondary)] mb-1">{day.day}</div>
              <div className="text-5xl mb-2">{day.icon}</div>
              <div className="text-xl font-bold text-[var(--app-text-primary)]">{day.temp}°C</div>
            </div>
            <div className="text-center text-sm text-[var(--app-text-primary)] mb-2">{day.condition}</div>
            <div className="text-center text-xs text-blue-600 font-semibold mb-2">
              💧 {day.rainfall}% rain chance
            </div>
            {day.alert && (
              <div className="mt-2 p-2 bg-red-500/20 rounded-lg text-xs text-red-700 font-semibold text-center">
                ⚠️ {day.alert}
              </div>
            )}
            {day.ideal && !day.alert && (
              <div className="mt-2 p-2 bg-green-500/20 rounded-lg text-xs text-green-700 font-semibold text-center">
                ✓ Good for work
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherTab;