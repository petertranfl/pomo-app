import React from 'react';

const Timer = (props) => {
    let minutes = (Math.floor(props.duration / 60));
    let minDisplay = minutes.toString()
    if (minutes < 10) {
        minDisplay = "0" + minDisplay;
    }
    
    let seconds = (props.duration - minutes * 60);
    let secDisplay = seconds.toString()
    if (seconds < 10) {
        secDisplay = "0" + secDisplay;
    }
    return (
        <div>
            {minDisplay} : {secDisplay} ==== {props.duration} secs
        </div>
    )
}

export default Timer;