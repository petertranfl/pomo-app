import React, {Component} from 'react';

class TimerEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editPomodoro: this.props.initialState.pomodoroInitial / 60,
            editShort: this.props.initialState.shortInitial / 60,
            editLong: this.props.initialState.longInitial / 60,
        }
    }

    // autoFocus = () => {
    //     this.focusRef.current.focus();
    // }

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
        this.props.submitEdit(this.state);
        this.props.toggleModal();
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Pomodoro</h1> <p>Minutes</p>
                <input
                    name="editPomodoro"
                    type="number"
                    defaultValue={this.state.editPomodoro}
                    onChange={this.handleChange}
                    />
                <input
                    name="editShort"
                    type="number"
                    defaultValue={this.state.editShort}
                    onChange={this.handleChange}/>
                <input
                    name="editLong"
                    type="number"
                    defaultValue={this.state.editLong}
                    onChange={this.handleChange}/>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default TimerEditor;