import React, { useState } from 'react'
import './StatsViewer.css'
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCog, faUserCircle, faInfoCircle, faChartBar, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

const StatsViewer = (props) => {

    const [show, setShow] = useState(false)

    let activeTaskTitle;
    if (props.taskList) {
        const activeTaskIndex = props.taskList.findIndex(task => task.timeStamp === props.activeTaskId)

        if (activeTaskIndex === -1) {
            activeTaskTitle = 'None'
        } else {
             activeTaskTitle = props.taskList[activeTaskIndex].title
        }
    } else {
        activeTaskTitle = 'No Task Selected'
    }

    function streak() {
        if (props.isLoggedIn) {
            return props.userStats.streak
        } else {
            return "--Login to Track Stats--"
        }
    }

    function longestStreak() {
        if (props.isLoggedIn) {
            return props.userStats.longestStreak
        } else {
            return "--Login to Track Stats--"
        }
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
        if (props.taskList) {
        props.taskList.forEach(task => {
            totalDuration += (task.duration - task.completed)
        })
        return totalDuration *= (props.userPref.pomodoroInitial + props.userPref.shortInitial)
        } else {
            return 0
        }
    }

    function completedHours() {
        if (props.userStats.pomoData[moment().format('dddd')] === 0 || typeof props.userStats.pomoData[moment().format('dddd')] == 'undefined') {
            return 0
        } else {
            console.log(props.userStats.pomoData[moment().format('dddd')])
            return Object.values(props.userStats.pomoData[moment().format('dddd')]).reduce((a, b) => a + b, 0)
        }
    }

    function toggleHint() {
        setShow(!show);
    }

    return (
        <div className="statsViewer">
            <h3>Active Task: </h3>
            <h3>{activeTaskTitle}</h3>
            <p className={props.isLoggedIn ? "hide" : "loginReminder"}>---Login to Track Stats---</p>
            <p className={props.isLoggedIn ? "streak" : "hide"}>Current Streak: {streak()}</p>
            <p className={props.isLoggedIn ? "streak" : "hide"}>Highest Streak: {longestStreak()}</p>
            <p>Estimated Finish: {moment().add(totalDuration(), 's').format('LT')}</p>
            <p>Hours Completed Today: {completedHours()}</p>
            <div className={show ? "hintDiv" : "hide"}>
                <h4>{<FontAwesomeIcon icon={faUserCircle} color="#744334"/>} at the top right to sign in.</h4>
                <h4>Add task cards and set one active to start tracking stats.</h4>
                <h4>Click on a task card to set it active.</h4>
                <h4>Drag and drop tasks in top-down order</h4>
                <h4>Customize settings with {<FontAwesomeIcon icon={faCog}/>}.</h4>
                <h4><FontAwesomeIcon icon={faChartBar}/> to look at weekly stats.</h4>
                <div className="hideHint" onClick={() => toggleHint()}>
                    {<FontAwesomeIcon icon={faEyeSlash} size="2x"/>}
                </div>
            </div>
            <div className={show ? "hide" : "infoButton"} onClick={() => toggleHint()}>
                <FontAwesomeIcon icon={faInfoCircle} size="3x"/>
            </div>
        </div>
    )
}

export default StatsViewer;