import React, {Component, useState} from 'react';
import './TaskManager.css';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

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

    // function createTask() {

    // }

        return (
            <div className="taskManager">
                <h1>Tasks:</h1>
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
        )
}


export default TaskManager;