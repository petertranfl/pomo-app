import React, {Component} from 'react';

class TimerEditor extends Component {
    constructor() {
        super()
        this.state = {
            editPomodoro: 25,
            editShort: 5,
            editLong: 10,
        }
        // this.focusRef = React.createRef()
    }

    // autoFocus = () => {
    //     this.focusRef.current.focus();
    // }

    //saves latest change in state
    handleChange = (event) => {
        event.preventDefault();

        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.submitEdit()
    }

    submitEdit = () => {
        this.setState(prevState => ({
            ...prevState
        }))
        this.props.submitEdit(this.state);
        this.props.toggleModal();
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}
                    onBlur={this.submitEdit}>
                <h1>Pomodoro</h1> <p>Minutes</p>
                <input
                    name="editPomodoro"
                    type="number"
                    defaultValue={25}
                    onChange={this.handleChange}
                    // ref={this.focusRef}
                    />
                <input
                    name="editShort"
                    type="number"
                    defaultValue={5}
                    onChange={this.handleChange}/>
                <input
                    name="editLong"
                    type="number"
                    defaultValue={10}
                    onChange={this.handleChange}/>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default TimerEditor;