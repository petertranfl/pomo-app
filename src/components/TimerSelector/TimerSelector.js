import React from 'react';
import './TimerSelector.css'

const TimerSelector = (props) => {
    return (
        <div className="TimerSelector">
            <div className="PomodoroSelector" onClick={props.pomodoro}>
                Pomodoro
            </div>
            <div className="ShortBreakSelector" onClick={props.shortBreak}>
                Short Break
            </div>
            <div className="LongBreakSelector" onClick={props.longBreak}>
                Long Break
            </div>
        </div>
    )
}

export default TimerSelector;