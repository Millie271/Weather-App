import React from 'react'
import './Weather.css'
import searchIcon from '../assets/search-interface-symbol.png'
import cloudIcon from '../assets/cloudy.png'
import rainIcon from '../assets/heavy-rain.png'
import sunIcon from '../assets/sun.png'
import snowIcon from '../assets/snow.png'
import thunderIcon from '../assets/thunderstorm.png'
import windIcon from '../assets/wind.png'
import humidityIcon from '../assets/humidity.png'

const Weather = () => {
  return (
    <div className="Weather">
      <div className="search-bar">
        <input type="text" placeholder="Enter city name" />
        <img src={searchIcon} alt="Search" />
      </div>
      <img src={cloudIcon} alt="Cloudy" className="weather-icon" />
      <div className="weather-info">
        <h2 className="city-name">Nairobi</h2>
        <p className="temperature">Temperature: 25°C</p>
        <p className="condition">Condition: Cloudy</p>
      </div>
    </div>
  )
}

export default Weather