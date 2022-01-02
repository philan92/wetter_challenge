import { IconButton, Slider } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import LoopIcon from "@mui/icons-material/Loop";
import React from "react";
import "./ControlBar.scss";
import Moment from "react-moment";

/** Displays a Control Bar that contains a Playbutton, a Slider and a Loopbutton
 *
 * @param timeSteps
 * List of timeSteps used for deisplaing all times on the slider
 *
 * @param isPlaying
 * Sets the state of the play button
 *
 * @param isLooping
 * Sets the state of the loop button
 *
 * @param activeIndex
 * Sets the position of the slider
 *
 * @param onPlayClick
 * Callback function called when the play button was clicked
 *
 * @param onLoopClick
 * Callback function called when the loop button was clicked
 *
 * @param onSliderChange
 * Callback function called when the loop button was moved and gives the current position
 */
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
        <Moment className="time" format="HH:mm">
          {timeSteps[activeIndex]}
        </Moment>

        <Moment className="date" format="DD.MM.">
          {timeSteps[activeIndex]}
        </Moment>
      </div>

      <Slider
        style={{ top: 10 }}
        key={"slider"}
        value={activeIndex}
        onChange={(e, value) => onSliderChange(value)}
        max={timeSteps.length - 1}
        marks={[
          {
            value: 36,
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
