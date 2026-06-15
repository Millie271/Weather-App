import React, {useEffect, useState} from 'react'
import './Weather.css'
import axios from "axios"
import searchIcon from '../assets/search-interface-symbol.png'
import cloudIcon from '../assets/cloudy.png'
import rainIcon from '../assets/heavy-rain.png'
import sunIcon from '../assets/sun.png'
import snowIcon from '../assets/snow.png'
import thunderIcon from '../assets/thunderstorm.png'
import windIcon from '../assets/wind.png'
import humidityIcon from '../assets/humidity.png'

const Weather = () => {
  const BASE_URL = "http://localhost:8000";
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const allIcons = {
    "01d": sunIcon,
    "01n": sunIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "04d": thunderIcon,
    "04n": thunderIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "11d": thunderIcon,
    "11n": thunderIcon,
    "13d": snowIcon,
    "13n": snowIcon,

  }

  const getWeather = async (city) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/weather/${city}`
      );

      const data = response.data;
      console.log("Weather Data:", data);
      
      // Map the icon code to the corresponding image
      const iconCode = data.weather[0].icon;
      data.weather[0].iconUrl = allIcons[iconCode] || cloudIcon; // default to cloud if not found
      
      // Set the weather state with API data
      setWeather(data);
      return data;

    } catch (error) {
      if (error.response) {
        console.log("Server Error:", error.response.data);
      } else if (error.request) {
        console.log("No response from server");
      } else {
        console.log("Request Error:", error.message);
      }
      return null;
    }
  };

const searchWeather = async () => {
  const data = await getWeather(city);

  if (data) {
    setWeather(data);
  }
};

  useEffect(() => {
    // Fetch default city on component load
    getWeather("New York");
  }, []);

  return (
    <div className="Weather">
      <div className="search-bar">
        <input type="text" placeholder="Enter city name" value={city} onChange={(e) => setCity(e.target.value)} />
        <img src={searchIcon} alt="Search" onClick={searchWeather} />
      </div>
      <img src={weather?.weather?.[0]?.iconUrl || cloudIcon} alt="Weather" className="weather-icon" />
      <div className="weather-info">
        <h2 className="city-name">{weather?.name}</h2>
        <p className="temperature">{weather?.main?.temp}°C</p>
        <p className="condition">Condition: {weather?.weather?.[0]?.description}</p>
      </div>

      <div className="weather-data">
        <div className="col">
          <img src={humidityIcon} alt="Humidity" />
          <div>
            <p>{weather?.main?.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={windIcon} alt="Wind" />
          <div>
            <p>{weather?.wind?.speed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather
