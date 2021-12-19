import React, { useEffect, useState } from "react";
import "./App.css";
import ControlBar from "./components/control_bar/ControlBar";
import Map from "./components/map/Map";

function App() {
  const [timeSteps, setTimeSteps] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

  // Fetch TimeStep data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Play/Pause functionality
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveIndex((index) => (index + 1) % timeSteps.length);
        if (!isLooping && activeIndex === timeSteps.length - 1) {
          setIsPlaying(false);
        }
      }, 200);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeIndex, isLooping, isPlaying, timeSteps]);


  const fetchData = async () => {
    const response = await fetch(
      "https://d39iuqtftml5m4.cloudfront.net/radar/germany/w3_hd_sat.json"
    );
    const data = await response.json();
    const steps = data.timesteps;

    setTimeSteps(steps);
  };

  const getListOfDatesFromTimeSteps = (): string[] => {
    return timeSteps.map((timeStep: any) => timeStep.date);
  };

  return (
    <div className="App">
      <Map />
      <ControlBar
        timeSteps={getListOfDatesFromTimeSteps()}
        activeIndex={activeIndex}
        isPlaying={isPlaying}
        isLooping={isLooping}
        onPlayClick={() => setIsPlaying(!isPlaying)}
        onLoopClick={() => setIsLooping(!isLooping)}
        onSliderChange={(value) => setActiveIndex(value)}
      />
    </div>
  );
}

export default App;
