import React, {Component} from 'react';
import './TimerBlock.css'
import TimerStartPause from '../TimerButton/TimerStartPause';
import TimerReset from '../TimerButton/TimerReset';

class TimerBlock extends Component {
    render() {
        return (
            <div>
                <div>
                    <TimerStartPause 
                        isRunning={this.state.isRunning}
                        start={() => this.timerActive(true)}
                        pause={() => this.timerActive(false)}/>
                    <TimerReset reset={() => this.timerReset()}/>
                </div>
            </div>
        )
    }
}

export default TimerBlock;