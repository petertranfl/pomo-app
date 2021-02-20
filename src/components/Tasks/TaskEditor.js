import React from 'react';
import '../Tasks/TaskEditor.css';
import {motion} from 'framer-motion';

const TaskEditor = (props) => {
    const taskInfo = props.taskInfo;

    function hideEditCard() {
        props.hideEditCard()
    }

    function editTask() {
        props.editTask();
    }
    return (
        <motion.div 
            className="taskEditorCard"
            animate={{scaleY: [.75, 1]}}
            transition={{duration: 0.2}}
        >
            <input type="text" placeholder="Name of Task?" autoFocus={true} required={true} id="editTaskTitle" defaultValue={taskInfo.title}></input>
            <input type="text" placeholder="Category?" id="editTaskCategory" defaultValue={taskInfo.category}></input>
            <p>Estimated Pomodoros to Complete?</p>
            <input type="number" defaultValue={taskInfo.duration} id={"editTaskDuration"}></input>
            <motion.button
                onClick={hideEditCard}>cancel</motion.button>
            <motion.button
                onClick={editTask}>save task</motion.button>
        </motion.div>
    )
}

export default TaskEditor;