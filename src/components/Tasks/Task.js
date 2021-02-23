import React from 'react';
import './Task.css';
import {motion} from 'framer-motion';
const Task = (props) => {
    const taskInfo = props.taskInfo;

    function startTask(taskId) {
        props.startTask(taskId);
    }

    function showEditCard(taskId) {
        props.showEditCard(taskId)
    }

    function editTask() {
        props.editTask();
    }

    function hideEditCard() {
        props.hideEditCard();
    }

    return (
        <motion.div className={taskInfo.timeStamp === props.activeTaskId ? "taskCard activeTask" : "taskCard"}
                        onClick={() => startTask(taskInfo.timeStamp)}>
                        <h2>{taskInfo.title}</h2>
                        <h3>{taskInfo.completed} / {taskInfo.duration}</h3>
                        <button onClick={() => showEditCard(taskInfo.timeStamp)}>Edit Task</button>
        </motion.div>
    )
}

export default Task;