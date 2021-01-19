import React, {Component} from 'react';
import './PomoApp.css'
import Timer from '../../components/Timer/Timer';
import TimerBlock from '../../components/TimerBlock/TimerBlock'
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
            timer = <Timer duration={this.state.pomodoro.initialDuration}/>
        } else if (this.state.currentTimerType === 1) {
            timer = <Timer duration={this.state.shortBreak.initialDuration}/>
        } else if (this.state.currentTimerType === 2) {
            timer = <Timer duration={this.state.pomodoro.initialDuration}/>
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
                    <TimerBlock/>
                    {timer}
                <div>
                    
                </div>
                </div>
            </div>
        )
    }
}

export default PomoApp;