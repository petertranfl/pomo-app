import React, {Component} from 'react';
import './PomoApp.css'
import Timer from '../../components/Timer/Timer';
import TimerStartPause from '../../components/TimerButton/TimerStartPause'
import TimerReset from '../../components/TimerButton/TimerReset'
import TimerSelector from '../../components/TimerSelector/TimerSelector';

class PomoApp extends Component {
    constructor() {
        super();
        this.state = {
            currentTimerType: 0,
            pomodoro: {
                initialDuration: 1500,
                currentDuration: 1500,
                isRunning: false,
                isFinished: false,
            },
            shortBreak:{
                initialDuration: 300,
                currentDuration: 300,
                isRunning: false,
                isFinished: false,
            },
            longBreak: {
                initialDuration: 600,
                currentDuration: 600,
                isRunning: false,
                isFinished: false,
            }
        }
        //initializing global timerIDs
        this.pomodoroTimerId = 4;
        this.shortBreakTimerId = 5;
        this.longBreakTimerId = 6;
    }

    tick = (timerType) => {
        let prevDuration;
        switch (timerType) {
            case 0:
                prevDuration = this.state.pomodoro.currentDuration;
                //if prev duration was 1s, timer is finished
                if (prevDuration === 1) {
                    clearInterval(this.pomodoroTimer)
                    this.setState(prevState => ({
                                    pomodoro:{
                                        ...prevState.pomodoro,
                                        currentDuration: this.state.pomodoro.initialDuration,
                                        isRunning: false,
                                        isFinished: true
                                    }}))
                    alert('pomotimer is finished')
                    return
                }
                //otherwise, tick down a duration
                this.setState(prevState => ({
                    pomodoro:{
                        ...prevState.pomodoro,
                        currentDuration: prevDuration - 1,
                    }
                }))
                console.log('pomotick')
                break;
            case 1:
                prevDuration = this.state.shortBreak.currentDuration;
                //if prev duration was 1s, timer is finished
                if (prevDuration === 1) {
                    clearInterval(this.shortBreakTimer)
                    this.setState(prevState => ({
                                    shortBreak:{
                                        ...prevState.shortBreak,
                                        currentDuration: this.state.shortBreak.initialDuration,
                                        isRunning: false,
                                        isFinished: true
                                    }}))
                    alert('shortBreak is finished')
                }
                //otherwise, tick down a duration
                this.setState(prevState => ({
                    shortBreak:{
                        ...prevState.shortBreak,
                        currentDuration: prevDuration - 1,
                    }
                }))
                console.log('short tick');
                break;
            case 2:
                prevDuration = this.state.longBreak.currentDuration;
                //if prev duration was 1s, timer is finished
                if (prevDuration === 1) {
                    clearInterval(this.longBreakTimer)
                    this.setState(prevState => ({
                                    longBreak:{
                                        ...prevState.longBreak,
                                        currentDuration: this.state.longBreak.initialDuration,
                                        isRunning: false,
                                        isFinished: true
                                    }}))
                    alert('longBreak is finished')
                }
                //otherwise, tick down a duration
                this.setState(prevState => ({
                    longBreak:{
                        ...prevState.longBreak,
                        currentDuration: prevDuration - 1,
                    }
                }))
                console.log('long tick');
                break;
        }  
    }

    //clean up switch statement
    timerActive = (start, timerType) => {
        if (start) {
            //change state of correct timer
        switch (timerType) {
            case 0: 
                this.setState(prevState => ({
                    pomodoro: {
                        ...prevState.pomodoro,
                        isRunning: true,
                        isFinished: false
                    }
                }))
                console.log('started pomo timer')
                this.pomodoroTimerId = setInterval(() => this.tick(0), 1000)
                break;
            case 1: 
                this.setState(prevState => ({
                    shortBreak: {
                        ...prevState.shortBreak,
                        isRunning: true,
                        isFinished: false
                    }
                }))
                console.log('started shortBreak timer')
                this.shortBreakTimerId = setInterval(() => this.tick(1), 1000)
                break;
            case 2:
                this.setState(prevState => ({
                    longBreak: {
                        ...prevState.longBreak,
                        isRunning: true,
                        isFinished: false
                    }
                }))
                this.longBreakTimerId = setInterval(() => this.tick(2), 1000)
                console.log('started longbreak timer')
                break;
            }
        } else {
            //pause state of timer
            switch (this.state.currentTimerType) {
                case 0:
                    this.setState(prevState => ({
                        pomodoro: {
                            ...prevState.pomodoro,
                            isRunning: false,
                        }
                    }))
                    console.log('pomotimer paused')
                    clearInterval(this.pomodoroTimerId);
                    break;
                case 1:
                    this.setState(prevState => ({
                        shortBreak: {
                            ...prevState.shortBreak,
                            isRunning: false,
                        }
                    }))
                    console.log('shorttimer paused')
                    clearInterval(this.shortBreakTimerId);
                    break;
                case 2:
                    this.setState(prevState => ({
                        longBreak: {
                            ...prevState.longBreak,
                            isRunning: false,
                        }
                    }))
                    console.log('longtimer paused')
                    clearInterval(this.longBreakTimerId);
                    break;
            }
        }
    }

    timerReset = () => {
        switch (this.state.currentTimerType) {
            case 0: 
                this.setState(prevState => ({
                    pomodoro: {
                        ...prevState.pomodoro,
                        currentDuration: this.state.pomodoro.initialDuration,
                        isRunning: false,
                        isFinished: false
                    }
                }))
                break;
            case 1: 
                this.setState(prevState => ({
                    shortBreak: {
                        ...prevState.shortBreak,
                        currentDuration: this.state.shortBreak.initialDuration,
                        isRunning: false,
                        isFinished: false
                    }
                }))
                break;
            case 2:
                this.setState(prevState => ({
                    longBreak: {
                        ...prevState.longBreak,
                        currentDuration: this.state.longBreak.initialDuration,
                        isRunning: false,
                        isFinished: false
                    }
                }))
                break;
        }
        clearInterval(this.interval);
    }

    //returns true if current timer is running
    checkTimerRunning = () => {
        switch (this.state.currentTimerType) {
            case 0:
                return this.state.pomodoro.isRunning
            case 1:
                return this.state.shortBreak.isRunning
            case 2:
                return this.state.longBreak.isRunning
        }
    }

    editTimer = (newDuration) => {
        this.setState(prevState => ({
            pomodoro: {
                ...prevState.pomodoro,
                initialDuration: newDuration,
                currentDuration: newDuration
            }
         }))
        console.log('pomo timer changed');
        console.log(this.state.pomodoro)
    }

    changeTimer = (timerType) => {
        if (timerType != this.state.currentTimerType) {
           this.setState({
               currentTimerType: timerType
           })
        }
    }

    render() {
        // 0 = pomodoro, 1 = short break, 2 = long break
        let timer;
        if (this.state.currentTimerType === 0) {
            timer = <Timer duration={this.state.pomodoro.currentDuration}/>
        } else if (this.state.currentTimerType === 1) {
            timer = <Timer duration={this.state.shortBreak.currentDuration}/>
        } else if (this.state.currentTimerType === 2) {
            timer = <Timer duration={this.state.longBreak.currentDuration}/>
        }
        return (
            <div>
                {/* <div>
                    <TimerEditor
                        input={this.state.initialDuration}
                        editPomodoroTimer={this.editPomodoroTimer}/>
                </div> */}
                <div className="TimerContainer">
                    <TimerSelector
                        pomodoro={() => this.changeTimer(0)}
                        shortBreak={() => this.changeTimer(1)}
                        longBreak={() => this.changeTimer(2)}/>
                        <div className="TimerBlock">
                            {timer}
                            <TimerStartPause
                                isRunning={this.checkTimerRunning()}
                                start={() => this.timerActive(true, this.state.currentTimerType)}
                                pause={() => this.timerActive(false, this.state.currentTimerType)}/>
                            <TimerReset reset={() => this.timerReset()}/>
                        </div>
                </div>
            </div>
        )
    }
}

export default PomoApp;