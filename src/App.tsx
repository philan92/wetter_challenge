import { useEffect, useState } from "react";
import "./App.css";
import ControlBar from "./components/control_bar/ControlBar";
import Map from "./components/map/Map";

function App() {
  const [timeSteps, setTimeSteps] = useState<Array<any>>([]);
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
        // Increase active index by one every 0.2s
        setActiveIndex((index) => (index + 1) % timeSteps.length);
        // Stop at the end if Loop is disabled
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

  const getCurrentSatFilePath = (): string => {
    const tileList = timeSteps.map(step => step.tiles)
    return tileList[activeIndex];
  }

  return (
    <div className="App">
      <Map satFilePath={getCurrentSatFilePath()}/>
      <ControlBar
        timeSteps={getListOfDatesFromTimeSteps()}
        activeIndex={activeIndex}
        isPlaying={isPlaying}
        isLooping={isLooping}
        onPlayClick={() => setIsPlaying(!isPlaying)}
        onLoopClick={() => setIsLooping(!isLooping)}
        onSliderChange={(sliderPosition) => setActiveIndex(sliderPosition)}
      />
    </div>
  );
}

export default App;
