import React from 'react';
import './TimerStartPause.css'

const TimerStartPause = (props) => {
    let clickStart = new Audio("/sound/FirstClickPomo.mp3")
    if (props.isTimerRunning) {
    return (
                <button className="timerPause" onClick={props.pause}>Pause</button>
        )
    }
    return (
            <button className="timerStart" onClick={props.start}>Start</button>
    )
};

export default TimerStartPause;