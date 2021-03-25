import React, {Component} from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Switch} from '@material-ui/core'

class TimerEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pomodoroInitial: this.props.initialState.pomodoroInitial / 60,
            shortInitial: this.props.initialState.shortInitial / 60,
            longInitial: this.props.initialState.longInitial / 60,
            autoStartTimer: this.props.initialState.autoStartTimer,
            autoStartTasks: this.props.initialState.autoStartTasks,
        }
    }

    //saves latest change in state
    handleChange = (event) => {
        event.persist();
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
        this.props.toggleModal(1);
    }

    toggleAutoStartTimer = () => {
        this.setState(prevState => ({
            autoStartTimer: !prevState.autoStartTimer
        }))
    }

    toggleAutoStartTasks = () => {
        this.setState(prevState => ({
            autoStartTasks: !prevState.autoStartTasks
        }))
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
                <FormControl component="fieldset">
                    <FormGroup aria-label="position" row>
                        <FormControlLabel
                        value="AutoStartTimerTrue"
                        control={<Switch
                            checked={this.state.autoStartTimer} 
                            onChange={this.toggleAutoStartTimer}/>}
                        label="AutoStart Timer"
                        labelPlacement="top"
                        />
                         <FormControlLabel
                        value="AutoStartTasksTrue"
                        control={<Switch
                            checked={this.state.autoStartTasks} 
                            onChange={this.toggleAutoStartTasks}/>}
                        label="AutoStart Tasks"
                        labelPlacement="top"
                        />
                    </FormGroup>
                </FormControl>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default TimerEditor;