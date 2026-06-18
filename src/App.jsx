import React, {useState} from 'react'
import Weather from './components/Weather'
import DailyForecast from './components/DailyForecast'
import WeeklyForecast from './components/WeeklyForecast'
import './App.css'
import './index.css'

const App = () => {

  const [weather, setWeather] = useState(null);

  return (
    <div className="App">
      <div className="layout">
        <Weather
          weather={weather}
          setWeather={setWeather}
        />

        <DailyForecast
          weather={weather}
        />
      </div>
      <WeeklyForecast />
    </div>
)
}

export default App
