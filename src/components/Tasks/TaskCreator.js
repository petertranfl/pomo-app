import React from 'react';
import './TaskCreator.css';
import {motion} from 'framer-motion';

const TaskCreator = (props) => {

    function createTask() {
        const task = {
            timeStamp: Date.now().toString(),
            title: document.getElementById('taskTitle').value,
            category:document.getElementById('taskCategory').value,
            duration: document.getElementById('taskEstPomodoro').value,
            finished: false,
        };
        console.log('task created')
        props.pushTaskToApp(task);
    }

    return (
        // <motion.div className="taskCreatorCard">
        //     <input type="text" placeholder="Name of Task?" autoFocus={true} required={true} id="taskTitle"></input>
        //     <input type="text" placeholder="Category?" id="taskCategory"></input>
        //     <p>Estimated Pomodoros to Complete?</p>
        //     <input type="number" value={1} id="taskEstPomodoro"></input>
        //     <motion.button>button to increment est. pomodoros</motion.button>
        //     <motion.button>button to decrement est. pomodoros</motion.button>
        //     <motion.button>cancel task</motion.button>
        //     <motion.button onClick={createTask}>save task</motion.button>
        // </motion.div>
        <motion.div className="createTaskButton">
            Add a Task
        </motion.div>
    )
}

export default TaskCreator;