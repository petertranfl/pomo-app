import React, {useState} from 'react';
import './TaskCreator.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes, faThumbtack} from '@fortawesome/free-solid-svg-icons'
import {motion} from 'framer-motion';

const TaskCreator = (props) => {

    const [shake, setShake] = useState(false)

    function createTask() {
        setShake(false)
        const task = {
            timeStamp: Date.now().toString(),
            title: document.getElementById('taskTitle').value,
            category: document.getElementById('taskCategory').value,
            completed: 0,
            duration: parseInt(document.getElementById('taskEstPomodoro').value),
            finished: false,
        };
        const str = task.title.replace(/\s/g, "");
        const pomo = task.duration;
        if (str === "") {
            document.getElementById('taskTitle').placeholder = "Task Must Have Title"
            shakeCard();
            return
        }
        if (pomo < 1) {
            shakeCard();
            return
        }
        props.addTask(task);
        showTaskCreator(false)
    }

    function shakeCard() {
        setShake(true);
    }

    function showTaskCreator(bool) {
        props.showTaskCreator(bool)
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
                key="taskCreatorCard33"
                className="taskCreatorCard"
                variants={variants}
                animate={["show", shake ? "shake" : "stop"]}
                transition={{duration: 0.2}}
                >
                <input type="text" placeholder="Task Name" autoFocus={true} id="taskTitle"></input>
                <p id="estPomo">Est. Pomos</p>
                <input type="text" placeholder="Category" id="taskCategory"></input>
                <input type="number" defaultValue={1} id="taskEstPomodoro"></input>
                <motion.div id="saveTaskDiv" onClick={() => createTask()}>
                    <motion.button className="motionButtonFont">
                        <FontAwesomeIcon icon={faThumbtack} id="saveTask" size="lg"></FontAwesomeIcon>
                    </motion.button>
                </motion.div>
                <motion.div id="cancelTaskDiv"  onClick={() => showTaskCreator(false)}>
                    <motion.button className="motionButtonFont" id="cancelCreateTask">
                        <FontAwesomeIcon icon={faTimes} size="lg"></FontAwesomeIcon>
                    </motion.button>
                </motion.div>
            </motion.div>
        )
}

export default TaskCreator;