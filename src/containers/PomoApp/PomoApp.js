import React, {Component} from 'react';
import './PomoApp.css';
import {motion} from 'framer-motion';
import click1 from '../../components/sound/FirstClickPomo.mp3'
import click2 from '../../components/sound/SecondClickPomo.mp3'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import {faChartBar} from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';
import Cookies from 'js-cookie';
import firebase from '../../firebase/firebase';
import ReactModal from 'react-modal';
import Window from '../../components/Window/Window';
import ProfileButton from '../../components/Login/ProfileButton';
import Login from '../../components/Login/Login';
import Timer from '../../components/Timer/Timer';
import TimerStartPause from '../../components/TimerButton/TimerStartPause';
import TimerSelector from '../../components/TimerSelector/TimerSelector';
import TimerEditor from '../../components/TimerEditor/TimerEditor';
import TaskManager from '../../components/Tasks/TaskManager';
import Chart from '../../components/Chart/Chart';

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
            userPref: {
                pomodoroInitial: 1500,
                shortInitial: 300,
                longInitial: 600,
                autoStartTimer: false,
                autoStartTasks: false
            },
            userStats: {
                streak: 0,
                longestStreak: 0,
                lastLoginDate: '',
                pomoData: {}
            },
            activeTaskId: '',
            taskList: []
        }
    }
    componentDidMount() {
        ReactModal.setAppElement('body');
        this.firstLoad();
    }

    firstLoad = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                Cookies.set('pomofiCookie', JSON.stringify({
                    userPref: {
                        pomodoroInitial: 1500,
                        shortInitial: 300,
                        longInitial: 600,
                        autoStartTimer: false,
                        autoStartTasks: false
                    },
                    taskList: [],
                }))
                // User is signed in.
                this.streakCheck();
                this.loadUserPref();
                if (this.state.showModal === true) {
                    this.modalToggler(0)
                }
            } else {
                this.loadCookies();
                if (this.state.showModal === true) {
                    this.modalToggler(0)
                }
            }
        }, (error) => {
            console.log(error)
        })
    }


    streakCheck = () => {
        
        //get users last login info
        let userStatsRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/userStats')
        let userStats;
        userStatsRef.once('value', (snapshot) => {
            userStats = snapshot.val();
            //if data finished loading
            if (userStats) {
                //strip date times to just compare days
                const currentDate = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate())
                const tempLastDate = new Date(userStats.lastLoginDate)
                const lastDate = new Date(tempLastDate.getFullYear(), tempLastDate.getMonth(), tempLastDate.getDate())

                //check if user logged has not logged in today
                if (currentDate.getTime() !== lastDate.getTime()) {
            
                    //check if user has not logged in yesterday
                    if ((currentDate.getTime() / 1000 - lastDate.getTime() / 1000) !== 86400 ) {
                        //reset streak counter
                        userStats.streak = 0
                    }
                    userStats.streak += 1
                    userStats.longestStreak = Math.max(userStats.longestStreak, userStats.streak)
                }
                //save to db
                userStats.lastLoginDate = Date.now()
                userStatsRef.set(userStats)
                this.watchUserStats();
            } else {
                setTimeout(this.streakCheck(), 2000)
            }
        })
    }

    //grabs userpref once and then grabs tasklist
    loadUserPref = () => {
        let userPrefRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/userPref');
        userPrefRef.once('value', (snapshot) => {
            let data = snapshot.val();
            if (data) {
                this.setState({
                    // username: user.displayName,
                    isLoggedIn: true,
                    currentDuration: data.pomodoroInitial,
                    userPref: data
                }, this.loadTaskList(data.autoStartTasks))
                //sign user into server
            } else {
                //data hasn't finished creating after first signup. need to wait.
                setTimeout(this.loadUserPref(), 2000)
            }
        })
    }

    //firstLoadFunction for taskList to set first active task after getting userpref
    loadTaskList = (autostart) => {
        let userPrefRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/taskList');
        userPrefRef.once('value', (snapshot) => {
            const data = snapshot.val();
            //if taskList exists
            if (data) {
                let firstTaskId = '';
                if (autostart === true) {
                    firstTaskId = data[0].timeStamp
                }
                this.setState({
                    activeTaskId: firstTaskId,
                    taskList: data
                })
            }
        })
    }

    watchUserStats = () => {
        if (firebase.auth().currentUser.uid) {
            let userStatsRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/userStats');
            userStatsRef.on('value', (snapshot) => {
                let data = snapshot.val();
                if (data) {
                    this.setState({
                        userStats: data
                    })
                    //if data hasn't loaded, try again in a second
                } else {
                    userStatsRef.off()
                    setTimeout(this.watchUserStats(), 2000)
                }
            }); 
        } else {
            return
        }
    }

    loadCookies = () => {
        let cookie = Cookies.getJSON('pomofiCookie');
        //if cookie exists
        if (cookie) {
            //set state from cookie
            this.setState({
                isLoggedIn: false,
                userPref: cookie.userPref,
                taskList: cookie.taskList
            })
        } else {
            Cookies.set('pomofiCookie', JSON.stringify({
                userPref: {
                    pomodoroInitial: 1500,
                    shortInitial: 300,
                    longInitial: 600,
                    autoStartTimer: false,
                    autoStartTasks: false
                },
                taskList: [],
            }))
        }
    }

    setCookies = (data) => {
        const tempCookie = Cookies.getJSON('pomofiCookie');
        //if the data is userpref
        if (data.pomodoroInitial) {
            tempCookie.userPref = data;
            Cookies.set('pomofiCookie', JSON.stringify(tempCookie))
        } 
        //otherwise it is taskList
        else {
            tempCookie.taskList = data;
            Cookies.set('pomofiCookie', JSON.stringify(tempCookie))
        }
    }

    //saves current hours finished to db
    saveDailyHour = (category) => {
        //save if user is logged in
        if (this.state.isLoggedIn) {
            const rawHours =  (this.state.userPref.pomodoroInitial / 3600)
            const hours = parseFloat(rawHours.toFixed(2))
            const newPomoData = this.state.userStats.pomoData
            const day = moment().format('dddd')
            //if no record for that day, create new entry
            if (this.state.userStats.pomoData[day] === 0) {
                const newEntry = {
                    [category]: hours
                }
                newPomoData[day] = newEntry;
            //if category found, add hours
            } else if (this.state.userStats.pomoData[day].hasOwnProperty(category)) {
                const newHours = newPomoData[day][category] + hours
                newPomoData[day][category] = newHours

            //if record found but no category, just set new value in record
            } else {
                newPomoData[day][category] = hours
            }
            this.setState(prevState => ({
                ...prevState,
                userStats: {
                    ...prevState.userStats,
                    pomoData: newPomoData
                }
            }))
            firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/userStats').update({pomoData: newPomoData})
        }
    }

    //saves new tasklist, sets state and saves to cookie or db if signed in
    saveTaskList = (newTaskList) => {
        if (this.state.isLoggedIn) {
            firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/taskList').set(newTaskList)
        } else {
            this.setCookies(newTaskList)
        }
        this.setState({
            taskList: newTaskList
        })
    }

    //saves new userpreferences, sets state and saves to cookie or db if signed in
    saveUserPref = (newUserPref) => {
        if (this.state.isLoggedIn) {
            firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/userPref').set(newUserPref)
        } else {
            this.setCookies(newUserPref)
        }
        this.setState({
            userPref: newUserPref
        }, this.resetTimer)
    }

    //toggles modal opening/closing and opens different modal child based on modalType
    modalToggler = (newModalType) => {
        this.setState(prevState => ({
            showModal: !prevState.showModal,
            modalType: newModalType,
        }))
    }

    tick = () => {
            //if prev duration was 0s, timer is finished
            if (this.state.currentDuration === 0) {
                clearInterval(this.state.timerId)
                //check to see which timer it's on
                if (this.state.currentTimerType === 0) {
                    this.completePomodoro();
                } else {
                    //if not on pomodorotimer, then switch to pomodorotimer
                    this.changeTimer(0);
                    if (this.state.userPref.autoStartTimer === true) {
                        this.startTimer(true);
                    }
                }
            } else {
            //otherwise, tick down a duration
            this.setState({
                    currentDuration: this.state.currentDuration - 1,
            })
        }
    }

    //finishes pomodoro. Increment task pomo and local pomocounter +1 then switches to correct timer based on current pomocounter.
    completePomodoro = () => {
        let newTimerType = 1;

        if (this.state.activeTaskId !== "") {
            const newTaskList = this.state.taskList;
            const activeTaskIndex = newTaskList.findIndex((task => task.timeStamp === this.state.activeTaskId));
            //result is -1 if item can't be found
            if (activeTaskIndex === -1) {
                alert('incorrect taskId in completePomo')
                return
            }
            //increment task pomo +1
            newTaskList[activeTaskIndex].completed++;
            //set task finished status if completed
            if (newTaskList[activeTaskIndex].completed === newTaskList[activeTaskIndex].duration) {
                newTaskList[activeTaskIndex].finished = true;
                if (this.state.userPref.autoStartTasks === true) {
                    this.checkForNewTask(activeTaskIndex);
                }
            }
            console.log('newTimerType ' + newTimerType)
            //send updated taskList to db
            this.saveTaskList(newTaskList)
            const category = newTaskList[activeTaskIndex].category
            this.saveDailyHour(category);
        }
        if (this.state.pomodoroCounter === 4) {
            newTimerType = 2;
            this.setState({
                pomodoroCounter: 0
            })
        } else {
            let newPomoCount = this.state.pomodoroCounter + 1
            this.setState({
                pomodoroCounter: newPomoCount
            })
        }
        this.changeTimer(newTimerType)
        if (this.state.userPref.autoStartTimer) {
            this.startTimer(true)
        }
    }

    checkForNewTask = (taskIndex) => {
        if (taskIndex + 1 == this.state.taskList.length) {
            const nextTaskId = this.state.taskList[0].timeStamp
            alert('tasks completed!')
            this.startTask(nextTaskId)
        } else {
            const nextTaskId = this.state.taskList[taskIndex + 1].timeStamp;
            this.startTask(nextTaskId)
        }
    }

    startTimer = (start) => {
        if (start) {
                let audio1 = new Audio(click1)
                audio1.play();
                this.setState({
                    isTimerRunning: true,
                    timerId: setInterval(this.tick, 1000)
                })
        } else {
            //pause state of timer
                let audio2 = new Audio(click2)
                audio2.play()
                this.setState({
                    isTimerRunning: false,
                })
                clearInterval(this.state.timerId);
            }
    }

    resetTimer = () => {
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

    changeTimer = (timerType) => {
        if (timerType !== this.state.currentTimerType) {
           this.setState({
               currentTimerType: timerType
           }, this.resetTimer);
        }
    }

    startTask = (taskId) => {
        this.setState({
            activeTaskId: taskId,
        })
    }

    archiveTasks = () => {
        //archive tasks
        let newTaskList = this.state.taskList
        let archivedData = [];
        newTaskList.forEach(({task}, index) => {
            if (task.finished === true) {
                const removed = newTaskList.splice(index, 1)
                archivedData.push(removed)
            } else alert('no completed tasks')
        })
        this.saveTaskList(newTaskList)
        //push archivedData to database
        // firebase.database().ref('users/' + this.state.username + '/archivedTasks').get()
    }

    setEditCard = (taskId) => {
        this.setState({
            editingTaskId: taskId
        })
    }

    render() {
        let modalChild;
        switch (this.state.modalType) {
            case 0: 
                modalChild = <Login
                                isLoggedIn={this.state.isLoggedIn}/>
                break;
            case 1: 
                modalChild = <TimerEditor
                    initialState={this.state.userPref}
                    submitEdit={this.saveUserPref}
                    toggleModal={this.modalToggler}/>
                break;
            case 2:
                modalChild = <Chart
                    data={this.state.userStats.pomoData}/>
                break;
            default:
                break;
        }
            
        return (
            <div className="wholePage">
                <ReactModal
                    isOpen={this.state.showModal}
                    className={this.state.modalType === 2 ? "chartModal" : "Modal"}
                    overlayClassName="Overlay"
                    shouldCloseOnOverlayClick={true}
                    shouldFocusAfterRender={true}
                    shouldCloseOnEsc={true}
                    onRequestClose={this.modalToggler}>
                    {modalChild}
                </ReactModal>
                <header>
                    <h1>Pomofi</h1>
                </header>
                    <Window/>
                    <ProfileButton
                        isLoggedIn={this.state.isLoggedIn}
                        toggleModal={this.modalToggler}/>
                    <div className="timerContainer">
                        <div className="timerSubContainer">
                            <div className="timerDisplay">
                            <TimerSelector
                                timerType={this.state.currentTimerType}
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
                                                onClick={() => this.modalToggler(1)}>
                                        <FontAwesomeIcon icon={faCog} size="2x"/>
                                </motion.button>
                                <motion.button className="chartButton" 
                                                onClick={() => this.modalToggler(2)}>
                                        <FontAwesomeIcon icon={faChartBar} size="2x"/>
                                </motion.button>
                            </div>
                        </div>
                        <TaskManager
                            startTask={this.startTask}
                            taskList={this.state.taskList}
                            userPref={this.state.userPref}
                            userStats={this.state.userStats}
                            activeTaskId={this.state.activeTaskId}
                            saveTaskList={this.saveTaskList}
                            showEditCard={this.setEditCard}
                            isLoggedIn={this.state.isLoggedIn}
                            />
                    </div>
                    <div className="whiteSpaceDiv"/>
            </div>
        )
    }
}

export default PomoApp;