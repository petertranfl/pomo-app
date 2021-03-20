import React from 'react';
import './TimerSelector.css'

const TimerSelector = (props) => {
    return (
        <div className="TimerSelector">
            <div className={props.timerType == 0 ? "activePomodoroSelector" : "PomodoroSelector"} onClick={props.pomodoro}>
                Pomodoro
            </div>
            <div className={props.timerType == 1 ? "activeShortSelector" : "ShortBreakSelector"} onClick={props.shortBreak}>
                Short Brk
            </div>
            <div className={props.timerType == 2 ? "activeLongSelector" : "LongBreakSelector"} onClick={props.longBreak}>
                Long Brk
            </div>
        </div>
    )
}

export default TimerSelector;