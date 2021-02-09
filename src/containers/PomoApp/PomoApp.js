import React, {Component} from 'react';
import './PomoApp.css'
import cloud1 from '../../img/clouds/cloud1.png'
import cloud2 from '../../img/clouds/cloud2.png'
import cloud3 from '../../img/clouds/cloud3.png'
import {motion} from 'framer-motion'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import ReactModal from 'react-modal'
import Timer from '../../components/Timer/Timer';
import TimerStartPause from '../../components/TimerButton/TimerStartPause';
import TimerSelector from '../../components/TimerSelector/TimerSelector';
import TimerEditor from '../../components/TimerEditor/TimerEditor';

class PomoApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timerId: 0,
            showModal: false,
            currentTimerType: 0,
            pomodoroCounter: 0,
            isRunning: false,
            isFinished: false,
            currentDuration: 1500,
            username: "",
            userPref: {
                pomodoroInitial: 1500,
                shortInitial: 300,
                longInitial: 600,
            },
            tasks: {
                title: "",
                category: "",
                duration: 0,
                finished: false,
            }
        }
        this.editorRef = React.createRef()
    }
    componentDidMount() {
        ReactModal.setAppElement('body');
        //TODO: check for cookies and update user preferences
    }
    modalToggler = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }))
    }

    closeOverlay = () => {
        this.editorRef.current.submitEdit(); 
    }

    tick = () => {
            //if prev duration was 0s, timer is finished
            if (this.state.currentDuration === 0) {
                clearInterval(this.state.timerId)
                //check to see which timer it's on. if  pomodoro timer ends, add one to pomodoro, if 
                if (this.state.currentTimerType === 0) {
                    //if pomodoroCounter is 4, reset counter and go to long break
                    if (this.state.pomodoroCounter === 4) {
                        this.setState({
                            pomodoroCounter: 0,
                            isFinished: true
                        })
                        this.changeTimer(2);
                    } else {
                         //add +1 to pomodoroCounter to track when to long break and if pomodoro is finished
                        this.setState(prevState => ({
                            ...prevState,
                            isRunning: false,
                            pomodoroCounter: prevState.pomodoroCounter++
                        }))
                        this.changeTimer(1);
                    }
                } else {
                switch (this.state.currentTimerType) {
                    case 0: this.changeTimer(1)
                        break;
                    case 2: this.changeTimer(0)
                        break;
                    }
                }
            } else {
            //otherwise, tick down a duration
            this.setState({
                    currentDuration: this.state.currentDuration - 1,
            })
            console.log('pomotick')
        }
    }

    startTimer = (start) => {
        if (start) {
                console.log(this.state)
                this.setState({
                    isRunning: true,
                    timerId: setInterval(this.tick, 1000)
                })
                console.log('started timer')
        } else {
            //pause state of timer
                this.setState({
                    isRunning: false,
                })
                console.log('timer paused')
                clearInterval(this.state.timerId);
            }
    }

    resetTimer = () => {
        console.log('resetTimer activated')
        console.log(this.state.currentTimerType)
        clearInterval(this.state.timerId);
        this.setState({
            isRunning: false
        })
        switch (this.state.currentTimerType) {
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

    render() {
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
                    {<TimerEditor
                        initialState={this.state.userPref}
                        ref={this.editorRef}
                        submitEdit={this.editTimer}
                        toggleModal={this.modalToggler}/>}
                </ReactModal>
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
                                isRunning={this.state.isRunning}
                                start={() => this.startTimer(true)}
                                pause={() => this.startTimer(false)}/>
                                <motion.button className="editButton" 
                                                    onClick={() => this.modalToggler()}
                                                    whileHover={{color: "#ffffff"}}>
                                        <FontAwesomeIcon icon={faEdit} size="2x"/>
                                </motion.button>
                                <motion.button className="chartButton" 
                                                    onClick={() => this.modalToggler()}
                                                    whileHover={{color: "#ffffff"}}>
                                        <FontAwesomeIcon icon={faEdit} size="2x"/>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PomoApp;