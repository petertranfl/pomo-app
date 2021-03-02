import React, {Component} from 'react';
import {Switch} from '@material-ui/core'

class TimerEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pomodoroInitial: this.props.initialState.pomodoroInitial / 60,
            shortInitial: this.props.initialState.shortInitial / 60,
            longInitial: this.props.initialState.longInitial / 60,
            autoStartTimer: false,
            autoStartTasks: false,
        }
    }

    //saves latest change in state
    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name] : parseInt(event.target.value)
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.submitEdit()
    }

    submitEdit = () => {
        const newUserPref = this.state
        newUserPref["pomodoroInitial"] *= 60
        newUserPref["shortInitial"] *= 60
        newUserPref["longInitial"] *= 60
        this.props.submitEdit(newUserPref);
        this.props.toggleModal();
    }

    toggleAutoStartTimer = (bool) => {
        this.setState({
            autoStartTimer: bool
        })
    }

    toggleAutoStartTasks = (bool) => {
        this.setState({
            autoStartTasks: bool
        })
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Pomodoro</h1> <p>Minutes</p>
                <input
                    name="pomodoroInitial"
                    type="number"
                    defaultValue={this.state.pomodoroInitial}
                    onChange={this.handleChange}
                    />
                <input
                    name="shortInitial"
                    type="number"
                    defaultValue={this.state.shortInitial}
                    onChange={this.handleChange}/>
                <input
                    name="longInitial"
                    type="number"
                    defaultValue={this.state.longInitial}
                    onChange={this.handleChange}/>
                <Switch
                    checked={this.state.autoStartTimer} label="Autostart Timer" onChange={this.toggleAutoStartTimer}/>
                <Switch
                    checked={this.state.autoStartTasks} label="Autostart Tasks" onChange={this.toggleAutoStartTasks}/>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default TimerEditor;