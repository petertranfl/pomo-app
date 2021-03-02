import React from 'react';
import './TaskCreator.css';
import {motion, AnimatePresence} from 'framer-motion';

const TaskCreator = (props) => {

    function createTask() {
        const task = {
            timeStamp: Date.now().toString(),
            title: document.getElementById('taskTitle').value,
            category:document.getElementById('taskCategory').value,
            completed: 0,
            duration: parseInt(document.getElementById('taskEstPomodoro').value),
            finished: false,
        };
        console.log('task created')
        props.addTask(task);
        showTaskCreator(false)
    }

    function showTaskCreator(bool) {
        props.showTaskCreator(bool)
    }

        return ( 
            <motion.div 
                key="taskCreatorCard33"
                className="taskCreatorCard"
                animate={{scaleY: [0, 1]}}
                transition={{duration: 0.2}}
                >
                <input type="text" placeholder="Name of Task?" autoFocus={true} required={true} id="taskTitle"></input>
                <input type="text" placeholder="Category?" id="taskCategory"></input>
                <p>Estimated Pomodoros to Complete?</p>
                <input type="number" defaultValue={1} id="taskEstPomodoro"></input>
                <motion.button>button to increment est. pomodoros</motion.button>
                <motion.button>button to decrement est. pomodoros</motion.button>
                <motion.button onClick={() => showTaskCreator(false)}>cancel task</motion.button>
                <motion.button onClick={() => createTask()}>save task</motion.button>
            </motion.div>
        )
}

export default TaskCreator;