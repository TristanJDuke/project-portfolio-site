import WeatherWidget from "../components/WeatherWidget";

export default function Home() {
    return (
      <div>
        <h1>Welcome to My Portfolio</h1>
        <p>This is my project portfolio site for CSCI3172!</p>
        {/* Add Weather Widget */}
        <WeatherWidget />
      </div>
    );
  }
  