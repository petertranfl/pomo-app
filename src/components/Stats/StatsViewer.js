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

    function truncate(str, n){
        //remove all whitespaces to check if task is empty
        if (str === "No Task Selected") {
            return str
        }
        return (str.length > n) ? str.substr(0, n-1) + '...' : str;
      };
    
    function totalDuration() {
        let totalDuration = 0;
        props.taskList.forEach(task => {
            totalDuration += (task.duration - task.completed)
        })
        return totalDuration *= (props.userPref.pomodoroInitial + props.userPref.shortInitial)
    }

    function completedHours() {
        if (props.userStats.pomoData[moment().format('dddd')] === 0) {
            return 0
        } else {
            console.log(props.userStats.pomoData[moment().format('dddd')])
            return Object.values(props.userStats.pomoData[moment().format('dddd')]).reduce((a, b) => a + b, 0)
        }
    }

    return (
        <div className="statsViewer">
            <h3>Active Task: {truncate(activeTaskTitle, 15)}</h3>
            <p>Current Streak: </p>
            <p>Highest Streak: </p>
            <p>Estimated Finish: {moment().add(totalDuration(), 's').format('LT')}</p>
            <p>Hours Completed Today: {completedHours()}</p>
        </div>
    )
}

export default StatsViewer;