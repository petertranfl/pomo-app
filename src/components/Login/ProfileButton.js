import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import "./ProfileButton.css"
import {faSignOutAlt, faUserCircle} from '@fortawesome/free-solid-svg-icons'
import firebase from '../../firebase/firebase';

const ProfileButton = (props) => {
    let button;
    if (props.isLoggedIn) {
        button = <div id="loginButton"
                    onClick={() => firebase.auth().signOut()}>
                    <FontAwesomeIcon icon={faSignOutAlt}size="2x" color="#501607c7" id="loginButton"/>
                </div>
    } else {
        button = <div id="loginButton"
                    onClick={() => props.toggleModal(0)}>
                    <FontAwesomeIcon icon={faUserCircle} size="2x" color="#501607c7" id="loginButton"/>
                </div>
    }

    return button
}

export default ProfileButton;