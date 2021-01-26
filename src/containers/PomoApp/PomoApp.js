import React, {Component} from 'react';
import './PomoApp.css'
import ReactModal from 'react-modal'
import Timer from '../../components/Timer/Timer';
import TimerStartPause from '../../components/TimerButton/TimerStartPause'
import TimerReset from '../../components/TimerButton/TimerReset'
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
            if (prevDuration === 1) {
                clearInterval(this.state.timerId)
                this.setState({
                    isRunning: false,
                    isFinished: true,
                })
                //TODO: switch timer
                alert('pomotimer is finished')
            }
            //otherwise, tick down a duration
            this.setState({
                    currentDuration: prevDuration - 1,
            })
            console.log('pomotick')
            console.log(this.state.showModal)
    }

    startTimer = (start) => {
        if (start) {
                console.log(this.state)
                this.setState({
                    isRunning: true
                })
                console.log('started timer')
                this.state.timerId = setInterval(this.tick, 1000)
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
        clearInterval(this.state.timerId);
        switch (this.state.currentTimerType) {
            case 0: 
                this.setState({
                   currentDuration: this.state.pomodoroInitial
                })
                break;
            case 1: 
                this.setState({
                    currentDuration: this.state.shortInitial
                })
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
            pomodoroInitial: newTimers.editPomodoro,
            shortInitial: newTimers.editShort,
            longInitial: newTimers.editLong
        }, this.resetTimer)
    }


    changeTimer = (timerType) => {
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
                        ref={this.editorRef}
                        submitEdit={this.editTimer}
                        toggleModal={this.modalToggler}/>}
                </ReactModal>
                <TimerSelector
                    pomodoro={() => this.changeTimer(0)}
                    shortBreak={() => this.changeTimer(1)}
                    longBreak={() => this.changeTimer(2)}/>
                <div className="TimerBlock">
                    <Timer duration={this.state.currentDuration}/>
                    <TimerStartPause
                        isRunning={this.state.isRunning}
                        start={() => this.startTimer(true)}
                        pause={() => this.startTimer(false)}/>
                    <TimerReset reset={() => this.resetTimer()}/>
                </div>
                <button onClick={() => this.modalToggler()}></button>
            </div>
        )
    }
}

export default PomoApp;