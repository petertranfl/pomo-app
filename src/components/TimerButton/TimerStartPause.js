import React from 'react';

const TimerStartPause = (props) => {
    const isRunning = props.isRunning;
    if (isRunning) {
    return (
            <button onClick={props.pause}>Pause</button>
        )
    }
    return (
        <button onClick={props.start}>Start</button>
    )
};

export default TimerStartPause;