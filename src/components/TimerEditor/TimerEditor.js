import React, {Component} from 'react';
import "./TimerEditor.css"
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
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
        console.log(event)
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
            <div className="editorBox">
                <form onSubmit={this.handleSubmit}>
                    <h1 className="timerTitle">Settings</h1> <p>Timer (minutes)</p>
                    <div className="timerInputs">
                        <TextField 
                            label="Pomodoro" 
                            name="pomodoroInitial" 
                            type="number" 
                            defaultValue={this.state.pomodoroInitial}
                            onChange={this.handleChange} />
                        <TextField
                            label="Short Break"
                            name="shortInitial"
                            type="number"
                            defaultValue={this.state.shortInitial}
                            onChange={this.handleChange}/>
                        <TextField
                            label="Long Break"
                            name="longInitial"
                            type="number"
                            defaultValue={this.state.longInitial}
                            onChange={this.handleChange}/>
                    </div>
                    <div className="editorSwitches">
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
                    </div>
                    <button value="submit">OK</button>
                </form>
            </div>
        )
    }
}

export default TimerEditor;