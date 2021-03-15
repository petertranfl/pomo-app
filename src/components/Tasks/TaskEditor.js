import React, {useState} from 'react';
import '../Tasks/TaskEditor.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes, faTrash, faCheck} from '@fortawesome/free-solid-svg-icons'
import {motion} from 'framer-motion';

const TaskEditor = (props) => {

    const [shake, setShake] = useState(false);

    function shakeCard() {
        setShake(true);
    }

    const taskInfo = props.taskInfo;

    function hideEditCard() {
        props.hideEditCard()
    }

    function editTask() {
        props.editTask();
    }

    function removeTask() {
        props.removeTask();
    }

    const variants = {
        show: {
            scaleY: [0, 1],
            transition: {duration: 0.2}
        },
        shake: {
            x: [0, -10, 0, 10, 0],
            transition: {type: "tween", duration: 0.2}
        }, 

    }

    return (
        <motion.div 
            className="taskEditorCard"
            variants={variants}
            animate={["show", shake ? "shake" : "stop"]}
            transition={{duration: 0.2}}
        >
            <input type="text" placeholder="Task Name" autoFocus={true} required={true} id="editTaskTitle" defaultValue={taskInfo.title}></input>
            <p id="estPomo">Est. Pomos</p>
            <input type="text" placeholder="Category" id="editTaskCategory"></input>
            <input type="number" defaultValue={taskInfo.duration} id="editTaskDuration"></input>
            <motion.div
                onClick={hideEditCard} id="cancelEditDiv">
                    <FontAwesomeIcon icon={faTimes} size="2x" id="cancelEditButton"></FontAwesomeIcon>
                </motion.div>
            <motion.div
                onClick={editTask} id="saveEditDiv">
                    <FontAwesomeIcon icon={faCheck} size="2x" id="saveEditButton"></FontAwesomeIcon>
                </motion.div>
            <motion.div
                onClick={removeTask} id="removeEditDiv">
                    <FontAwesomeIcon icon={faTrash} size="2x" id="removeEditButton"></FontAwesomeIcon>
            </motion.div>
        </motion.div>
    )
}

export default TaskEditor;