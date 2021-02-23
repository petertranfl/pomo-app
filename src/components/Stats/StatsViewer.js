import React from 'react'
import './StatsViewer.css'
import moment from 'moment';

const StatsViewer = (props) => {
    
    const activeTaskIndex = props.taskList.findIndex(task => task.timeStamp === props.activeTaskId)
    let activeTaskTitle;
    if (activeTaskIndex === -1) {
        activeTaskTitle = 'No Task Selected'
    } else {
         activeTaskTitle = props.taskList[activeTaskIndex].title
    }
    function totalDuration() {
        let totalDuration = 0;
        props.taskList.forEach(task => {
            totalDuration += (task.duration - task.completed)
        })
        return totalDuration *= (props.userPref.pomodoroInitial + props.userPref.shortInitial)
    }

    return (
        <div>
            <p>Current Task: {activeTaskTitle}</p>
            <p>Estimated Finish: {moment().add(totalDuration(), 's').format('LT')}</p>
        </div>
    )
}

export default StatsViewer;