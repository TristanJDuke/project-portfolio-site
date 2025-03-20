import { useState, useEffect } from "react";

const API_KEY = "c4891d4dcdf97cdcfe5e969af92883f2";

interface WeatherData {
  name: string;
  main: { temp: number };
  weather: { description: string }[];
}

export default function WeatherWidget() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error("Location not found or API limit reached.");

      const data = await response.json();
      setWeather(data);
      setCity(data.name);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        }
      );
    } else {
      setError("Geolocation is not supported in this browser.");
    }
  };

  const fetchWeatherByCity = async (cityName: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error("City not found or API limit reached.");

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className="container mt-4">
      <h2>🌤️ Weather Forecast</h2>

      {/* Search Box */}
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Enter a city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="btn btn-primary mb-3" onClick={() => fetchWeatherByCity(city)}>
        Get Weather
      </button>

      <button className="btn btn-secondary mb-3 ms-2" onClick={getUserLocation}>
        Use My Location
      </button>

      {/* Loading & Error Handling */}
      {loading && <p>Loading weather...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      {/* Display Weather Data */}
      {weather && (
        <div className="alert alert-info">
          <h4>{weather.name}</h4>
          <p>
            <strong>Temperature:</strong> {weather.main.temp}°C
          </p>
          <p>
            <strong>Condition:</strong> {weather.weather[0].description}
          </p>
        </div>
      )}
    </div>
  );
}
