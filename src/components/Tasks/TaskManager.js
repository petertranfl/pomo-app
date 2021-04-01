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
            shakeCard: false,
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
            this.props.taskList,
            result.source.index,
            result.destination.index
          );
           this.saveNewTaskList(items)
    }

    saveNewTaskList = (taskList) => {
        this.props.saveTaskList(taskList)
    }

    addTask = (task) => {
        let newTaskList;
        if (this.props.taskList) {
            newTaskList = this.props.taskList
        } else {
            newTaskList = [];
        }
        newTaskList.push(task)
        this.saveNewTaskList(newTaskList);
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

    editTask = (index, task) => {
        console.log('editing task')
        console.log(index)
        console.log(task)
        let newTaskList = this.props.taskList
        newTaskList[index] = task
        this.hideEditCard()
        this.saveNewTaskList(newTaskList)
    }

    removeTask = (index) => {
        let newTaskList = this.props.taskList;
        newTaskList.splice(index, 1)
        this.hideEditCard()
        this.saveNewTaskList(newTaskList)
    }

    editCheck = (taskId) => {
        if (this.state.editingTaskId === taskId) {
            return true
        }
        return false
    }

    render() {

    let dragNDrop;

    if (this.props.taskList) {
        dragNDrop = <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided) => (
                                <ul className="taskList" ref={provided.innerRef} {...provided.droppableProps}>
                                    {this.props.taskList.map(({timeStamp}, index) => {
                                        return (
                                            <Draggable key={timeStamp} draggableId={timeStamp} index={index}>
                                                {(provided) => (
                                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        {this.editCheck(timeStamp) ? 
                                                            <TaskEditor
                                                                taskList={this.props.taskList}
                                                                taskInfo={this.props.taskList[index]}
                                                                editTask={this.editTask}
                                                                removeTask={() => this.removeTask(index)}
                                                                hideEditCard={this.hideEditCard}/>
                                                            :  <Task taskInfo={this.props.taskList[index]}
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
    } else {
       dragNDrop = null
    }

    let taskCreatorCard;
    if (this.state.showTaskCreator) {
        taskCreatorCard = <TaskCreator
                         addTask={this.addTask}
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
                <div className="leftTaskSide">
                    <div className="tasksHeader">
                        Tasks
                    </div>
                    {dragNDrop}
                    {taskCreatorCard}
                </div>
                <div className="rightStatSide">
                    <div className="statsHeader">Stats</div>
                    <StatsViewer
                        activeTaskId={this.props.activeTaskId}
                        taskList={this.props.taskList}
                        userPref={this.props.userPref}
                        userStats={this.props.userStats}
                        isLoggedIn={this.props.isLoggedIn}
                        />
                </div>
            </div>
        )
    }
}


export default TaskManager;