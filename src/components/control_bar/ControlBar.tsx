import { IconButton, Slider } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import LoopIcon from "@mui/icons-material/Loop";
import React from "react";
import "./ControlBar.scss";
import Moment from "react-moment";
import moment from "moment";

function valuetext(value: number) {
  return `${value} Uhr`;
}

/** Displays a Control Bar that contains a Playbutton, a Slider and a Loopbutton */
const ControlBar = ({
  timeSteps,
  isPlaying,
  isLooping,
  activeIndex,
  onPlayClick,
  onLoopClick,
  onSliderChange,
}: {
  timeSteps: any[];
  isPlaying: boolean;
  isLooping: boolean;
  activeIndex: number;
  onPlayClick: () => void;
  onLoopClick: () => void;
  onSliderChange: (value: any) => void;
}) => {
  return (
    <div className="control-bar">
      <IconButton
        className="play-button"
        aria-label="play"
        size="large"
        onClick={onPlayClick}
      >
        {isPlaying ? (
          <PauseCircleIcon fontSize="inherit" />
        ) : (
          <PlayCircleIcon fontSize="inherit" />
        )}
      </IconButton>

      <div className="date-time-container">
        
        <div className="time">
          {moment.utc(timeSteps[activeIndex]).format("HH:mm")}
        </div>
        
        <p className="date">
          <Moment format="DD.MM.">{timeSteps[activeIndex]}</Moment>
        </p>
      </div>

      <Slider
      style={{top:10}}
        key={"slider"}
        value={activeIndex}
        onChange={(e, value) => onSliderChange(value)}
        max={timeSteps.length - 1}
        marks={[
          {
            value: 48,
            label: "Jetzt",
          },
        ]}
      />

      <IconButton
        className={isLooping ? "active loop-button" : "loop-button"}
        aria-label="loop"
        onClick={onLoopClick}
      >
        <LoopIcon />
      </IconButton>
    </div>
  );
};

export default ControlBar;
