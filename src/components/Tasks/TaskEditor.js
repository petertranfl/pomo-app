import React, {useState} from 'react';
import '../Tasks/TaskEditor.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes, faTrash, faCheck} from '@fortawesome/free-solid-svg-icons'
import {motion} from 'framer-motion';

const TaskEditor = (props) => {

    const [shake, setShake] = useState(false);
    const taskInfo = props.taskInfo;
    const taskList = props.taskList

    function shakeCard() {
        setShake(true);
    }
    
    function editTask() {
        setShake(false);
        const index = taskList.findIndex((task => task.timeStamp === taskInfo.timeStamp));
        const editedTask = {
                timeStamp: taskInfo.timeStamp,
                title: document.getElementById('editTaskTitle').value,
                category: document.getElementById('editTaskCategory').value,
                duration: parseInt(document.getElementById('editTaskDuration').value),
                completed: taskInfo.completed,
                finished: taskInfo.finished,
        }
        const titlestr = editedTask.title.replace(/\s/g, "");
        const catstr = editedTask.title.replace(/\s/g, "");
        const pomo = editedTask.duration
        if (titlestr === "") {
            document.getElementById('editTaskTitle').placeholder = "Task Must Have Title"
            shakeCard();
            return
        }
        if (catstr === "") {
            editedTask.category = 'No Category'
        }
        if (pomo < 1) {
            shakeCard();
            return
        }
        props.editTask(index, editedTask)
        props.hideEditCard()
    }

    function hideEditCard() {
        props.hideEditCard()
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
            <input type="text" placeholder="Category" id="editTaskCategory" defaultValue={taskInfo.category}></input>
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