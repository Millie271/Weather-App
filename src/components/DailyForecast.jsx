import React, {useEffect, useState} from 'react'
import './DailyForecast.css'
import axios from "axios"



const DailyForecast = ({ weather }) => {
const [currentTime, setCurrentTime] = useState(new Date());
const [forecast, setForecast] = useState([]);

const sunrise = weather?.sys?.sunrise
    ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString()
    : "--";

const sunset = weather?.sys?.sunset
      ? new Date(weather.sys.sunset * 1000).toLocaleTimeString()
      : "--";

const getForecast = async(city) => {
const response = await axios.get(`http://localhost:8000/forecast/${city}`);

    setForecast(response.data.list);
  }

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    useEffect(() => {
      if (weather?.name) {
        getForecast(weather.name);
      }
    }, [weather]);

  return (
    <div className="DailyForecast">
      <div className="daily-header">Daily Forecast</div>
      <div className="daily-body">
      <div className="datetime">
        <p>{currentTime.toLocaleDateString()}</p>
        <p>{currentTime.toLocaleTimeString()}</p>
      </div>

      <div className="hourly-container">
      {forecast.slice(0, 8).map((hour, index) => (
        <div className="hour-card" key={index}>
          <p className="hour-time">
            {new Date(hour.dt * 1000)
              .toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
          </p>

            <p className="hour-temp">{Math.floor(hour.main.temp)}°</p>
          </div>
        ))}
      </div>


        <div className="sun-times">
          <div className="sunrise">
            <p>Sunrise</p>
            <span>{sunrise}</span>
          </div>

          <div className="sunset">
            <p>Sunset</p>
            <span>{sunset}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DailyForecast
