import React, {Component} from 'react';
import './PomoApp.css'
import Timer from '../../components/Timer/Timer';
import TimerBlock from '../../components/TimerBlock/TimerBlock'
import TimerStartPause from '../../components/TimerButton/TimerStartPause'
import TimerReset from '../../components/TimerButton/TimerReset'
// import TimerSelector from '../../components/TimerSelector/TimerSelector';
// import TimerEditor from '../../components/TimerEditor/TimerEditor'

class PomoApp extends Component {
    state = {
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

    tick = () => {
        console.log('tick started')
        let prevDuration;
        switch (this.state.currentTimerType) {
            case 0:
                prevDuration = this.state.pomodoro.currentDuration;
                //if prev duration was 1s, timer is finished
                if (prevDuration === 1) {
                    clearInterval(this.interval)
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
                console.log(this.state.pomodoro)
                console.log('pomo tick started')
                break;
            case 1:
                prevDuration = this.state.shortBreak.currentDuration;
                //if prev duration was 1s, timer is finished
                if (prevDuration === 1) {
                    clearInterval(this.interval)
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
                console.log('shortBreak tick started')
                break;
            case 2:
                prevDuration = this.state.longBreak.currentDuration;
                //if prev duration was 1s, timer is finished
                if (prevDuration === 1) {
                    clearInterval(this.interval)
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
                break;
        }  
    }

    //clean up switch statement
    timerActive = (start) => {
        console.log(this.state)
        if (start) {
            //change state of correct timer
        switch (this.state.currentTimerType) {
            case 0: 
                this.setState(prevState => ({
                    pomodoro: {
                        ...prevState.pomodoro,
                        isRunning: true,
                        isFinished: false
                    }
                }))
                console.log('started pomo timer')
            case 1: 
                this.setState(prevState => ({
                    shortBreak: {
                        ...prevState.shortBreak,
                        isRunning: true,
                        isFinished: false
                    }
                }))
            case 2:
                this.setState(prevState => ({
                    longBreak: {
                        ...prevState.longBreak,
                        isRunning: true,
                        isFinished: false
                    }
                }))
                //start timer
            }   this.interval = setInterval(this.tick, 1000);;
        } else {
            console.log('timer paused')
            //pause state of timer
            switch (this.state.currentTimerType) {
                case 0:
                    this.setState(prevState => ({
                        pomodoro: {
                            ...prevState.pomodoro,
                            isRunning: false,
                        }
                    }));
                case 1:
                    this.setState(prevState => ({
                        shortBreak: {
                            ...prevState.shortBreak,
                            isRunning: false,
                        }
                    }));
                case 2:
                    this.setState(prevState => ({
                        longBreak: {
                            ...prevState.longBreak,
                            isRunning: false,
                        }
                    }));
            }
            //pause timer
            clearInterval(this.interval)
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
                console.log('started pomo timer')
            case 1: 
                this.setState(prevState => ({
                    shortBreak: {
                        ...prevState.shortBreak,
                        currentDuration: this.state.shortBreak.initialDuration,
                        isRunning: false,
                        isFinished: false
                    }
                }))
            case 2:
                this.setState(prevState => ({
                    longBreak: {
                        ...prevState.longBreak,
                        currentDuration: this.state.longBreak.initialDuration,
                        isRunning: false,
                        isFinished: false
                    }
                }))
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

    changeTimer = () => {

    }

    render() {
        // 0 = pomodoro, 1 = short break, 2 = long break
        let timer;
        if (this.state.currentTimerType === 0) {
            timer = <Timer duration={this.state.pomodoro.currentDuration}/>
        } else if (this.state.currentTimerType === 1) {
            timer = <Timer duration={this.state.shortBreak.currentDuration}/>
        } else if (this.state.currentTimerType === 2) {
            timer = <Timer duration={this.state.pomodoro.currentDuration}/>
        }
        return (
            <div>
                {/* <div>
                    <TimerEditor
                        input={this.state.initialDuration}
                        editPomodoroTimer={this.editPomodoroTimer}/>
                </div> */}
                {/* <div>
                    <TimerSelector/>
                </div> */}
                <div className="TimerBlock">
                    {timer}
                    <TimerStartPause 
                        isRunning={this.checkTimerRunning()}
                        start={() => this.timerActive(true)}
                        pause={() => this.timerActive(false)}/>
                    <TimerReset reset={() => this.timerReset()}/>
                <div>
                    
                </div>
                </div>
            </div>
        )
    }
}

export default PomoApp;