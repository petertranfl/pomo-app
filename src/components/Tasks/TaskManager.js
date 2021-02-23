import React, {Component} from 'react';
import './TaskManager.css';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import TaskCreator from '../Tasks/TaskCreator';
import Task from '../Tasks/Task'
import TaskEditor from '../Tasks/TaskEditor'
import StatsViewer from '../Stats/StatsViewer'
import { motion } from 'framer-motion';

class TaskManager extends Component {
        constructor(props) {
        super(props);
        this.state = {
            editingTaskId: '',
            showTaskCreator: false,
            taskList: props.taskList
        }
    }

    // a little function to help us with reordering the result
    reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    };

    onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = this.reorder(
            this.state.taskList,
            result.source.index,
            result.destination.index
          );

        this.setState({
            taskList: items
        }, this.sendNewTaskList(items))
      
    }

    sendNewTaskList = (taskList) => {
        this.props.updateTaskList(taskList)
    }

    pushTaskToApp = (task) => {
        this.props.pushTaskToApp(task)
    }

    startTask = (taskId) => {
        this.props.startTask(taskId)
    }

    showTaskCreator = (bool) => {
        this.setState({
            showTaskCreator: bool
        })
    }

    showEditCard = (taskId) => {
        this.setState({
            editingTaskId: taskId
        })
    }

    hideEditCard = () => {
        this.setState({
            editingTaskId: ''
        })
    }

    editTask = (index) => {
        const editedTask = {
                timeStamp: this.state.taskList[index].timeStamp,
                title: document.getElementById('editTaskTitle').value,
                category: document.getElementById('editTaskCategory').value,
                duration: parseInt(document.getElementById('editTaskDuration').value),
                completed: this.state.taskList[index].completed,
                finished: this.state.taskList[index].finished,
        }
        let newTaskList = this.state.taskList
        newTaskList[index] = editedTask
        console.log(document.getElementById('editTaskDuration'))
        this.setState({
            taskList: newTaskList
        }, this.hideEditCard())
        this.sendNewTaskList(newTaskList)
    }

    removeTask = (index) => {
        let newTaskList = this.state.taskList.splice(index, 1);
        this.setState({
            taskList: newTaskList
        }, this.hideEditCard())
        this.sendNewTaskList(newTaskList)
    }

    editCheck = (taskId) => {
        if (this.state.editingTaskId === taskId) {
            return true
        }
        return false
    }

    render() {

    let dragNDrop;

    if (this.state.taskList.length === 0) {
        dragNDrop = null;
    } else {
        dragNDrop = <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided) => (
                                <ul className="taskList" ref={provided.innerRef} {...provided.droppableProps}>
                                    {this.state.taskList.map(({timeStamp}, index) => {
                                        return (
                                            <Draggable key={timeStamp} draggableId={timeStamp} index={index}>
                                                {(provided) => (
                                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        {this.editCheck(timeStamp) ? 
                                                            <TaskEditor
                                                                taskInfo={this.state.taskList[index]}
                                                                editTask={() => this.editTask(index)}
                                                                removeTask={() => this.removeTask(index)}
                                                                hideEditCard={this.hideEditCard}/>
                                                            :  <Task taskInfo={this.state.taskList[index]}
                                                                    activeTaskId={this.props.activeTaskId}
                                                                    showEditCard={this.showEditCard}
                                                                    startTask={this.startTask}
                                                                    /> 
                                                        }
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

    let taskCreatorCard;
    if (this.state.showTaskCreator) {
        taskCreatorCard = <TaskCreator
                         pushTaskToApp={this.pushTaskToApp}
                         showTaskCreator={this.showTaskCreator}>
                        </TaskCreator>
    } else {
        taskCreatorCard =   <motion.button
                            className="createTaskButton"
                            // variants={this.buttonVariants}
                            // initial="rest"
                            // // whileHover={{color: '#2f2a2a', backgroundColor:'#ffe7d999'}}
                            // whileTap="pressed"
                            onClick={() => this.showTaskCreator(true)}>
                            Add Task
                        </motion.button>
    }

        return (
            <div className="taskManager">
                <div className="tasksHeader">Tasks</div>
                <div className="statsHeader">Stats</div>
                {dragNDrop}
                {taskCreatorCard}
                <StatsViewer
                    activeTaskId={this.props.activeTaskId}
                    taskList={this.state.taskList}
                    userPref={this.props.userPref}
                    />
            </div>
        )
    }
}


export default TaskManager;