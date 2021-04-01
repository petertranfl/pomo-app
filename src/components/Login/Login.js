import React, {Component} from 'react';
import "./Login.css"
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../../firebase/firebase';
import * as firebaseui from 'firebaseui'


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSignedIn: this.props.isLoggedIn
        }
    }

    render() {
        const uiConfig =  {
            callbacks: {
              signInSuccessWithAuthResult: function() {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.\
                return false;
              },
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            // signInSuccessUrl: '<url-to-redirect-to-on-success>',
            signInOptions: [
              // Leave the lines as is for the providers you want to offer your users.
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              firebase.auth.FacebookAuthProvider.PROVIDER_ID,
              firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
            credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
            // Terms of service url.
            tosUrl: '<your-tos-url>',
            // Privacy policy url.
            privacyPolicyUrl: '<your-privacy-policy-url>'
          };
        let loginLogout;
        // if (this.state.isSignedIn) {
        //   loginLogout = <div className="signOut">
        //                   <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
        //                 </div>
        // } else {
        //   loginLogout = <div className="signIn">
        //                 <h1>Welcome</h1>
        //                   <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        //                 </div>
        // }
          return (
                  <div className="signIn">
                    <h1>Welcome</h1>
                          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                  </div>
        )
    }
}

export default Login;