import React, {useState} from 'react';
import './TaskManager.css';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import TaskCreator from '../Tasks/TaskCreator';

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
    }

    function sendNewTaskList(taskList) {
        props.updateTaskList(taskList)
    }

    function pushTaskToApp(task) {
        props.pushTaskToApp(task)
    }

    var dragNDrop;

    if (taskList === []) {
        dragNDrop = null;
    } else {
        dragNDrop = <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="tasksList">
                            {(provided) => (
                                <ul className="tasks" {...provided.droppableProps} ref={provided.innerRef}>
                                    {taskManagerState.map(({timeStamp, title, category, duration, completed}, index) => {
                                        return (
                                            <Draggable key={timeStamp} draggableId={timeStamp} index={index}>
                                                {(provided) => (
                                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <div className="taskCard">
                                                        <h2>{title}</h2>
                                                        <p>{completed} / {duration}</p>
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
    }

        return (
            <div className="taskManager">
                <div className="tasksHeader">Tasks</div>
                <div className="statsHeader">Stats</div>
                {dragNDrop}
                <TaskCreator
                    pushTaskToApp={pushTaskToApp}></TaskCreator>
            </div>
        )
}


export default TaskManager;