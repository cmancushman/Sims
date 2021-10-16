import React from 'react';
import './App.css';
import { Router, Route } from 'react-router-dom';
import history from './history';


import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import "firebase/auth";
import NavBar from './NavBar';
import Play from './content/Play';

const firebaseConfig = {
    apiKey: "AIzaSyDvJC49j05f9tnn4X2hw4qzTBcupIRmEqY",
    authDomain: "sim-alpha-864fc.firebaseapp.com",
    projectId: "sim-alpha-864fc",
    storageBucket: "sim-alpha-864fc.appspot.com",
    messagingSenderId: "103414692392",
    appId: "1:103414692392:web:dfb25e077c8c724297d31d",
    measurementId: "G-ER5KNHLJRM"
};

if (!firebase.apps?.length) {
    firebase.initializeApp(firebaseConfig);
}

type Props = {};

type State = { currentUser: any }


const description = '' +
    'This is the human simulation, where the public (you) has control of me for the entire period of the game. ' +
    'Sign in to get started.';

const footerDescription = `` +
    `The abbreviated word 'Sim' in 'The Human Sim' is short for simulation. ` +
    `The Human Sim is not affiliated in any way with The Sims game franchise, its developers, or Electronic Arts.`;
export default class AppView extends React.Component<Props, State> {

    uiConfig: any;

    constructor(props: Props) {
        super(props);

        this.state = {
            currentUser: null
        }

        this.uiConfig = {
            signInFlow: firebase.auth().isSignInWithEmailLink(window.location.href) ? 'redirect' : 'popup',
            // We will display Google and Facebook as auth providers.
            signInOptions: [
                firebase.auth.PhoneAuthProvider.PHONE_SIGN_IN_METHOD,
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
                },
            ],
            callbacks: {
                signInSuccessWithAuthResult: (result) => {
                    this.setState({ currentUser: result?.user });
                    window.localStorage.setItem("user", result?.user);
                },
            }
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
        });
    }

    render() {
        const { currentUser } = this.state;
        const localUser = window?.localStorage?.user;
        return (
            <div className="App">
                {currentUser || localUser
                    ? <div>
                        <Router history={history}>
                            <NavBar />
                            <Route path="/" exact component={Play} />
                            <Route path="/play" exact component={Play} />
                            <Route path="/the-rules" exact component={() => <div />} />
                            <Route path="/about-me" exact component={() => <div />} />
                        </Router>
                    </div>
                    : <div className='welcome-screen'>
                        <h2>Welcome to The Human Sim</h2>
                        <p>{description}</p>
                        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                    </div>
                }
                <footer><p className={'footertext'}>{footerDescription}</p></footer>
            </div>
        );
    }
};


