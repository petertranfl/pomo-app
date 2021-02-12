import React, {useState} from 'react';
import './TaskManager.css';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import { motion } from 'framer-motion';

const TaskManager = (props) => {
    const taskList = props.taskList;
    const [taskManagerState, updateTasks] = useState(taskList);

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(taskManagerState);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        updateTasks(items);
        sendNewTaskList(items);
        console.log('ondragend')
    }

    function sendNewTaskList(taskList) {
        console.log('sending updating index of tasks')
        props.updateTaskList(taskList)
    }

        return (
            <div className="taskManager">
                <h1>TaskMaster 3000</h1>
                <motion.button className="createTaskButton"
                                onClick={() => props.modalToggler()}>Create Task</motion.button>
                <div className="taskManagerDisplay">
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="tasksList">
                            {(provided) => (
                                <ul className="tasks" {...provided.droppableProps} ref={provided.innerRef}>
                                    {taskManagerState.map(({timeStamp, title, category, duration}, index) => {
                                        return (
                                            <Draggable key={timeStamp} draggableId={timeStamp} index={index}>
                                                {(provided) => (
                                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <div className="taskCard">
                                                        <h1>{title}</h1>
                                                        <h3>Category: {category}</h3>
                                                        <h3># of Pomos Left : {duration}</h3>
                                                    </div>
                                                </li>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        )
}


export default TaskManager;