import React, { useState, useEffect } from "react";
import "./WeatherApp.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const api_key = "e6b5bda55b1179b1c578a80971c683f2";

const WeatherApp = () => {
  const [wicon, setWicon] = useState(cloud_icon);
  const [searchResult, setSearchResult] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    if (city) {
      const fetchData = async () => {
        const weatherData = await fetchWeatherData(city);
        if (weatherData) {
          setSearchResult(weatherData);
          updateWeatherInfo(weatherData);
          updateWeatherIcon(weatherData);
        } else {
          setSearchResult("Không có dữ liệu, vui lòng nhập lại!");
        }
      };
      fetchData();
    }
  }, [city]);

  const fetchWeatherData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  const updateWeatherInfo = (data) => {
    const humidity = data.main.humidity + "%";
    const wind = Math.floor(data.wind.speed) + "km/h";
    const temperature = Math.floor(data.main.temp - 273.15) + "°C";
    const location = data.name;

    const humidityElement =
      document.getElementsByClassName("humidity-percent")[0];
    const windElement = document.getElementsByClassName("wind-rate")[0];
    const temperatureElement =
      document.getElementsByClassName("weather-temp")[0];
    const locationElement =
      document.getElementsByClassName("weather-location")[0];

    humidityElement.innerHTML = humidity;
    windElement.innerHTML = wind;
    temperatureElement.innerHTML = temperature;
    locationElement.innerHTML = location;
  };

  const updateWeatherIcon = (data) => {
    const iconMapping = {
      "01d": clear_icon,
      "01n": clear_icon,
      "02d": cloud_icon,
      "02n": cloud_icon,
      "03d": drizzle_icon,
      "03n": drizzle_icon,
      "04d": drizzle_icon,
      "04n": drizzle_icon,
      "09d": rain_icon,
      "09n": rain_icon,
      "10d": rain_icon,
      "10n": rain_icon,
      "13d": snow_icon,
      "13n": snow_icon,
    };

    setWicon(iconMapping[data.weather[0].icon] || clear_icon);
  };

  const handleSearch = () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value !== "") {
      setCity(element[0].value);
    }
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container">
      <div className="header">Weather App</div>
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Tìm kiếm"
          onKeyDown={handleEnterKey}
        />
        <div className="search-icon" onClick={handleSearch}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      {searchResult !== null ? (
        searchResult === "Không có dữ liệu, vui lòng nhập lại!" ? (
          <div className="no-data-message">{searchResult}</div>
        ) : (
          <div className="no-data"></div>
        )
      ) : null}
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">...</div>
      <div className="weather-location">Đang cập nhật</div>
      <div className="data-container">
        <div className="element">
          <div className="data">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="text">Độ ẩm</div>
            <div className="humidity-percent">...</div>
          </div>
        </div>
        <div className="element">
          <div className="data">
            <img src={wind_icon} alt="" className="icon" />
            <div className="text">Tốc độ gió</div>
            <div className="wind-rate">...</div>
          </div>
        </div>
      </div>
      <div className="footer">Copyright © 2023 Winter.</div>
    </div>
  );
};

export default WeatherApp;
