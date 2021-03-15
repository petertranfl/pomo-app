import React from 'react';
import './Task.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen} from '@fortawesome/free-solid-svg-icons'
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
                        <div class="editTaskPenDiv">
                            <FontAwesomeIcon icon={faPen} size="2x" class="editTaskPen" onClick={() => showEditCard(taskInfo.timeStamp)}></FontAwesomeIcon>
                        </div>
                        <h3>{taskInfo.completed} / {taskInfo.duration}</h3>
        </motion.div>
    )
}

export default Task;