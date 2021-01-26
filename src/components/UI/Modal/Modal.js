import React, {Component} from 'react';
import "./Modal.css"

class Modal extends Component {

    constructor() {
        super();
        this.ref = React.createRef()  
    }
    componentDidUpdate() {
        console.log('component updated')
        if(this.props.show) {
            this.modalAutoFocus()
        }
    }
    modalAutoFocus() {
        console.log('focus inside ref')
        this.ref.current.focus();
    }

    closeModal = () => {
        console.log('modal closed from blur')
        this.props.toggleModal()
    }

    render() {
    const showHideClassName = this.props.show ? "Modal" : "ModalHide"
    return (
        <div className={showHideClassName}
            onBlur={this.closeModal}
            ref={this.ref}
            tabIndex={-1}>
            {this.props.children}
        </div>
    )}
}

export default Modal;