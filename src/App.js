import React from 'react';
import './styles/App.css';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import { initializeFirebase } from './initializeFirebase';

const history = createBrowserHistory();

type Props = {};

type State = {
    currentUser: any,
};


const description = '' +
    'The first Web3 Credit Score generator, for users of decentralized lending platforms.';

class AppView extends React.Component<Props, State> {

    uiConfig: any;

    constructor(props: Props) {
        super(props);

        initializeFirebase();

        this.state = {
            currentUser: null,
        }

        this.uiConfig = {
            signInFlow: firebase.auth().isSignInWithEmailLink(window.location.href) ? 'redirect' : 'popup',
            // We will display Google and Facebook as auth providers.
            signInOptions: [
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    signInMethod: firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
                },
            ],
            callbacks: {
                signInSuccessWithAuthResult: (result) => {
                    this.setState({ currentUser: result?.user });
                    window.localStorage.setItem("uid", result?.user.uid);
                },
            }
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ currentUser: user });
            window.localStorage.setItem("refreshToken", user?.refreshToken);
        });
    }

    render() {
        const { currentUser } = this.state;

        const user = firebase.auth().currentUser;
        if ((window.localStorage.refreshToken && window.localStorage.refreshToken !== 'undefined') && !user && !currentUser) {
            return null;
        }

        return (
            <Router history={history}>
                <div className="App">
                    {Boolean(user || currentUser)
                        ? <div>
                            <Switch>
                                <Route path="/" exact component={() => <div>Placeholder for content to come</div>} />
                            </Switch>
                        </div>
                        : <div className='welcome-screen'>
                            <p className='welcome-description'>{description}</p>
                            {<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />}
                        </div>
                    }
                </div>
            </Router>
        );
    }
};

export default AppView;