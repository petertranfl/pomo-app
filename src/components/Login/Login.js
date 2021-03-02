import React, {Component} from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebaseui from 'firebaseui'
import firebase from '../../firebase/firebase'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSignedIn: false
        }
    }

    render() {
        const uiConfig =  {
            callbacks: {
              signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                console.log(authResult.user)
                console.log('hep')
                return true;
              },
            //   uiShown: function() {
            //     // The widget is rendered.
            //     // Hide the loader.
            //     document.getElementById('loader').style.display = 'none';
            //   }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: '<url-to-redirect-to-on-success>',
            signInOptions: [
              // Leave the lines as is for the providers you want to offer your users.
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              firebase.auth.FacebookAuthProvider.PROVIDER_ID,
              firebase.auth.TwitterAuthProvider.PROVIDER_ID,
              firebase.auth.EmailAuthProvider.PROVIDER_ID,
              firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
            ],
            credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
            // Terms of service url.
            tosUrl: '<your-tos-url>',
            // Privacy policy url.
            privacyPolicyUrl: '<your-privacy-policy-url>'
          };
        
          return (
            <div>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
            </div>
        )
    }
}

export default Login;