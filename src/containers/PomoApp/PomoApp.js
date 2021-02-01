import React, {Component} from 'react';
import './PomoApp.css'
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
            isRunning: false,
            isFinished: false,
            currentDuration: 1500,
            pomodoroInitial: 1500,
            shortInitial: 300,
            longInitial: 600,
        }
        this.editorRef = React.createRef()
    }
    componentDidMount() {
        ReactModal.setAppElement('body');
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
        let prevDuration = this.state.currentDuration;
            //if prev duration was 1s, timer is finished
            if (prevDuration === 0) {
                clearInterval(this.state.timerId)
                this.setState({
                    isRunning: false,
                    isFinished: true,
                })
                switch (this.state.currentTimerType) {
                    case 0: this.changeTimer(1)
                        break;
                    case 1: this.changeTimer(2)
                        break;
                    case 2: this.changeTimer(0)
                        break;
                }
            }
            //otherwise, tick down a duration
            this.setState({
                    currentDuration: prevDuration - 1,
            })
            console.log('pomotick')
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
                   currentDuration: this.state.pomodoroInitial
                }, console.log(this.state.currentDuration))
                break;
            case 1: 
                this.setState({
                    currentDuration: this.state.shortInitial
                }, console.log(this.state.currentDuration))
                break;
            case 2:
                this.setState({
                    currentDuration: this.state.longInitial
                })
                break;
        }
    }

    editTimer = (newTimers) => {
        console.log(newTimers)
        this.setState({
            pomodoroInitial: newTimers.editPomodoro * 60,
            shortInitial: newTimers.editShort * 60,
            longInitial: newTimers.editLong * 60
        }, this.resetTimer)
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
                        initialState={this.state}
                        ref={this.editorRef}
                        submitEdit={this.editTimer}
                        toggleModal={this.modalToggler}/>}
                </ReactModal>
                <div className="window">
                    <div className="timerContainer">
                        <TimerSelector
                            pomodoro={() => this.changeTimer(0)}
                            shortBreak={() => this.changeTimer(1)}
                            longBreak={() => this.changeTimer(2)}/>
                        <div className="timerSubContainer">
                            <div className="timerDisplay">
                                <button className="editButton" onClick={() => this.modalToggler()}><FontAwesomeIcon icon={faEdit} size="2x"/></button>
                                <Timer duration={this.state.currentDuration}/>
                            </div>
                        </div>
                        <div className="divAboveStartButton"></div>
                        <TimerStartPause
                            isRunning={this.state.isRunning}
                            start={() => this.startTimer(true)}
                            pause={() => this.startTimer(false)}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default PomoApp;