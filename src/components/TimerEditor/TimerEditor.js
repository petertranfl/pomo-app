import React, {Component} from 'react';

class TimerEditor extends Component {

    state = {
        editPomodoroDuration: 25,
        editShortBreakDuration: 5,
        editLongBreakDuration: 10,
    }
    handleChange = (event) => {

    }
    
    changeTimerDuration = (event) => {
        this.setState({
            editDuration: event.target.value
        })
    }

    handleSubmit = (event) => {
        let convertedDuration = this.state.editDuration * 60
        this.props.editPomodoroTimer(convertedDuration)
        event.preventDefault()
        console.log(convertedDuration)
        console.log('submitted')
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Pomodoro</h1> <p>Minutes</p>
                <input 
                    type="number"
                    defaultValue={25}
                    onChange={this.handleChange}
                    
                    />
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default TimerEditor;