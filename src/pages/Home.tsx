import WeatherWidget from "../components/WeatherWidget";

export default function Home() {
  document.title = "Home | Portfolio";
    return (
      <div>
        <h1>I'm Tristan Duke, this is my portfolio site.</h1>
        <h1>It is a work in progress.</h1>
        {/* Add Weather Widget */}
        <WeatherWidget />
      </div>
    );
  }
  
