import React, {Component} from 'react';
import './PomoApp.css'
import cloud1 from '../../img/clouds/cloud1.png'
import cloud2 from '../../img/clouds/cloud2.png'
import cloud3 from '../../img/clouds/cloud3.png'
import {motion} from 'framer-motion'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-regular-svg-icons';
import ReactModal from 'react-modal'
import Timer from '../../components/Timer/Timer';
import TimerStartPause from '../../components/TimerButton/TimerStartPause';
import TimerSelector from '../../components/TimerSelector/TimerSelector';
import TimerEditor from '../../components/TimerEditor/TimerEditor';
import TaskManager from '../../components/Tasks/TaskManager';
import TaskCreator from '../../components/Tasks/TaskCreator';

class PomoApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timerId: 0,
            showModal: false,
            modalType: 0,
            currentTimerType: 0,
            pomodoroCounter: 0,
            isTimerRunning: false,
            currentDuration: 1500,
            isLoggedIn: false,
            loggedInYesterday: false,
            username: "",
            userPref: {
                pomodoroInitial: 1500,
                shortInitial: 300,
                longInitial: 600,
                autoStartTimer: true,
                autoStartTasks: true
            },
            userStats: {
                streak: 10,
                totalHours: 20,
                dailyHours: 0,
                weeklyHours: 6,
                favoriteTask: '',
                lastLoginDate: '',
            },
            activeTaskId: '',
            taskList: [
                {
                timeStamp: "10101112331",
                title: "taskList",
                category: "Programming",
                duration: 1,
                completed: 0,
                finished: false,
            }, {
                timeStamp: "1049314231",
                title: "portraits",
                category: "Art",
                duration: 2,
                completed: 0,
                finished: false,
            }
        ]
    }
        this.editorRef = React.createRef()
    }
    componentDidMount() {
        ReactModal.setAppElement('body');
        //TODO: check for cookies and update user preferences
        //check state for login after obtaining new data
        if (this.state.userPref.autoStartTasks === true) {
            this.setState({
                activeTaskId: this.state.taskList[0].timeStamp
            })
        }
    }

    //toggles modal opening/closing and opens different modal child based on modalType
    modalToggler = (newModalType) => {
        this.setState(prevState => ({
            showModal: !prevState.showModal,
            modalType: newModalType,
        }))
    }

    closeOverlay = () => {
        if (this.state.modalType === 0) {
        this.editorRef.current.submitEdit(); 
        } else {
            this.modalToggler(0)
        }
    }

    tick = () => {
            //if prev duration was 0s, timer is finished
            if (this.state.currentDuration === 0) {
                clearInterval(this.state.timerId)
                //check to see which timer it's on
                if (this.state.currentTimerType === 0) {
                    //if pomodoroCounter is 4, reset counter and go to long break
                    if (this.state.pomodoroCounter === 4) {
                        this.setState({
                            pomodoroCounter: 0,
                        })
                        console.log('changed to long break')
                        this.changeTimer(2);
                    } else {
                         //add +1 to pomodoroCounter and go to short break
                        this.completePomodoro();
                        console.log('changed to short break')
                        this.changeTimer(1);
                        if (this.state.userPref.autoStartTimer === true) {
                            this.startTimer(true);
                        }
                    }
                } else {
                    //if not on pomodorotimer, then switch to pomodorotimer
                    this.changeTimer(0);
                    console.log('changed to pomo')
                    if (this.state.userPref.autoStartTimer === true) {
                        this.startTimer(true);
                    }
                }
            } else {
            //otherwise, tick down a duration
            this.setState({
                    currentDuration: this.state.currentDuration - 1,
            })
            console.log(this.state.taskList)
            console.log('pomotick')
        }
    }

    completePomodoro = () => {
        const newTaskList = this.state.taskList;
        const activeTaskIndex = newTaskList.findIndex((task => task.timeStamp === this.state.activeTaskId));
        newTaskList[activeTaskIndex].completed++;
        const newHours = this.state.userStats.dailyHours + Math.fround(this.state.userPref.pomodoroInitial / 3600)

        //if completed task completed, set as completed
        if (newTaskList[activeTaskIndex].completed === newTaskList[activeTaskIndex].duration) {
            newTaskList[activeTaskIndex].finished = true;
            this.setState(prevState => ({
                ...prevState,
                pomodoroCounter: prevState.pomodoroCounter++,
                userStats: {
                    ...prevState.userStats,
                    dailyHours: newHours
                },
                taskList: newTaskList
            }), this.checkForNewTask(activeTaskIndex))
        } else {
            this.setState(prevState => ({
                ...prevState,
                pomodoroCounter: prevState.pomodoroCounter++,
                userStats: {
                    ...prevState.userStats,
                    dailyHours: newHours
                }
            }))
        }
    }

    checkForNewTask = (taskIndex) => {
        if (taskIndex + 1 == this.state.taskList.length) {
            alert('tasks completed!')
        } else {
            const newTaskId = this.state.taskList[taskIndex + 1].timeStamp;
            this.startTask(newTaskId)
        }
    }

    startTimer = (start) => {
        if (start) {
                console.log(this.state)
                this.setState({
                    isTimerRunning: true,
                    timerId: setInterval(this.tick, 1000)
                })
                console.log('started timer')
        } else {
            //pause state of timer
                this.setState({
                    isTimerRunning: false,
                })
                console.log('timer paused')
                clearInterval(this.state.timerId);
            }
    }

    resetTimer = () => {
        console.log('resetTimer activated')
        clearInterval(this.state.timerId);
        this.setState({
            isTimerRunning: false
        })
        switch (this.state.currentTimerType) {
            //just in case an unexpected value was given
            default: alert('UNEXPECTED VALUE GIVEN TO TIMERTYPE')
            break;
            case 0: 
                this.setState({
                   currentDuration: this.state.userPref.pomodoroInitial
                })
                break;
            case 1: 
                this.setState({
                    currentDuration: this.state.userPref.shortInitial
                })
                break;
            case 2:
                this.setState({
                    currentDuration: this.state.userPref.longInitial
                })
                break;
        }
    }

    editTimer = (newTimers) => {
        console.log(newTimers)
        this.setState(prevState => ({
            ...prevState,
            userPref: {
                ...prevState.userPref,
                pomodoroInitial: newTimers.editPomodoro * 60,
                shortInitial: newTimers.editShort * 60,
                longInitial: newTimers.editLong * 60
            }
        }), this.resetTimer)
    }


    changeTimer = (timerType) => {
        console.log('changetimer activated')
        if (timerType !== this.state.currentTimerType) {
           this.setState({
               currentTimerType: timerType
           }, this.resetTimer);
        }
    }

    updateTaskList = (newTaskList) => {
        this.setState(prevState => ({
            ...prevState,
            taskList: newTaskList
        }))
    }

    pushTaskToApp = (task) => {
        const newTaskList = this.state.taskList;
        newTaskList.push(task)
        this.setState({
            taskList: newTaskList
        })
    }

    startTask = (taskId) => {
        this.setState({
            activeTaskId: taskId,
        })
    }

    clearFinishedTasks = () => {
        //archive tasks
        let newTaskList = this.state.taskList
        let archivedData = [];
        newTaskList.forEach(({task}, index) => {
            if (task.finished === true) {
                const removed = newTaskList.splice(index, 1)
                archivedData.push(removed)
            } else alert('no copmletex tasks')
        })
        this.setState({taskList: newTaskList})
        //push archivedData to database
    }

    setEditCard = (taskId) => {
        this.setState({
            editingTaskId: taskId
        })
    }

    render() {
        let modalChild;
        switch (this.state.modalType) {
            default: 
                //just in case unexpected value was given
                // modalChild = <Login></Login>;
                break;
            case 0: 
                modalChild = <TimerEditor
                    initialState={this.state.userPref}
                    ref={this.editorRef}
                    submitEdit={this.editTimer}
                    toggleModal={this.modalToggler}/>
                break;
            case 1:
                modalChild = <TaskCreator
                    pushTaskToApp={this.pushTaskToApp}/>
                break;
            // case 2:
            //     modalChild = <Charts></Charts>
        }
            
        return (
            <div className="wholePage">
                <ReactModal
                    isOpen={this.state.showModal}
                    className="Modal"
                    overlayClassName="Overlay"
                    shouldCloseOnOverlayClick={true}
                    shouldFocusAfterRender={true}
                    shouldCloseOnEsc={true}
                    onRequestClose={this.closeOverlay}>
                    {modalChild}
                </ReactModal>
                <header>
                    <h1>Pomofi</h1>
                </header>
                    <div className="window">
                        <div className="cloud1">
                            <motion.img src={cloud1}
                                        animate={{x: 2000}}
                                        transition={{duration: 8, type:"tween"}}
                                        />
                        </div>
                        <div className="cloud2">
                            <motion.img src={cloud2}/>
                        </div>
                        <div className="cloud3">
                            <motion.img src={cloud3}/>
                        </div>
                    </div>
                    <div className="timerContainer">
                        <div className="timerSubContainer">
                            <div className="timerDisplay">
                            <TimerSelector
                                pomodoro={() => this.changeTimer(0)}
                                shortBreak={() => this.changeTimer(1)}
                                longBreak={() => this.changeTimer(2)}/>
                                <Timer duration={this.state.currentDuration}/>
                            </div>
                            <div className="timerButtons">
                                <TimerStartPause
                                isTimerRunning={this.state.isTimerRunning}
                                start={() => this.startTimer(true)}
                                pause={() => this.startTimer(false)}/>
                                <motion.button className="editButton" 
                                                onClick={() => this.modalToggler(0)}
                                                whileHover={{color: "#ffffff"}}>
                                        <FontAwesomeIcon icon={faCog} size="2x"/>
                                </motion.button>
                                <motion.button className="chartButton" 
                                                onClick={() => this.modalToggler(0)}
                                                whileHover={{color: "#ffffff"}}>
                                        <FontAwesomeIcon icon={faChartBar} size="2x"/>
                                </motion.button>
                            </div>
                        </div>
                        <TaskManager
                            startTask={this.startTask}
                            taskList={this.state.taskList}
                            userPref={this.state.userPref}
                            activeTaskId={this.state.activeTaskId}
                            updateTaskList={this.updateTaskList}
                            modalToggler={() => this.modalToggler(1)}
                            pushTaskToApp={this.pushTaskToApp}
                            showEditCard={this.setEditCard}
                            />
                    </div>
                    <div className="hintDiv">
                            This is content to explain pomodoros. 
                            Maybe a tutorial? also content to give scrollbar for content layout.
                        </div>
            </div>
        )
    }
}

export default PomoApp;