import React from 'react'
import './StatsViewer.css'
import moment from 'moment';

const StatsViewer = (props) => {

    let activeTaskTitle;

    if (props.taskList) {
        const activeTaskIndex = props.taskList.findIndex(task => task.timeStamp === props.activeTaskId)

        if (activeTaskIndex === -1) {
            activeTaskTitle = 'No Task Selected'
        } else {
             activeTaskTitle = props.taskList[activeTaskIndex].title
        }
    } else {
        activeTaskTitle = 'No Task Selected'
    }
    
    function totalDuration() {
        let totalDuration = 0;
        props.taskList.forEach(task => {
            totalDuration += (task.duration - task.completed)
        })
        return totalDuration *= (props.userPref.pomodoroInitial + props.userPref.shortInitial)
    }

    return (
        <div className="statsViewer">
            <p>Current Streak: </p>
            <p>Highest Streak: </p>
            <p>Current Task: {activeTaskTitle}</p>
            <p>Estimated Finish: {moment().add(totalDuration(), 's').format('LT')}</p>
            <p>Hours Completed Today: {props.userStats.pomoData[moment().format('dddd')].toFixed(2)}</p>
        </div>
    )
}

export default StatsViewer;