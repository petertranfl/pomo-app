import React from 'react';

const TimerStartPause = (props) => {
    if (props.isRunning) {
    return (
            <button onClick={props.pause}>Pause</button>
        )
    }
    return (
        <button onClick={props.start}>Start</button>
    )
};

export default TimerStartPause;