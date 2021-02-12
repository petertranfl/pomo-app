import React from 'react';
import './TaskCreator.css';

const TaskCreator = (props) => {

    function createTask(event) {
        event.preventDefault();
        const task = {
            timeStamp: Date.now().toString(),
            title: event.target[0].value,
            category: event.target[1].value,
            duration: event.target[2].value,
            finished: false,
        };
        console.log('task created')
        props.pushTaskToApp(task);
    }

    function handleChange(event) {
            event.preventDefault();
     }
    return (
        <div className="taskCreator">
            <form onSubmit={createTask}>
                <input
                    type="string"
                    defaultValue= "What do you want to focus on?"
                    onChange={handleChange}
                    />
                <input
                    type="string"
                    defaultValue="Category"
                    onChange={handleChange}/>
                <input
                    type="number"
                    defaultValue="Number of Pomodoros"
                    onChange={handleChange}/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default TaskCreator;