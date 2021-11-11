import React from 'react';
import './styles/App.css';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import "firebase/auth";
import NavBar from './NavBar';
import Play from './content/Play';
import Rules from './content/Rules';
import Pointers from './content/Pointers';
import { isMobile } from 'react-device-detect';
import { TwitchEmbed } from 'react-twitch-embed';

const firebaseConfig = {
    apiKey: "AIzaSyDvJC49j05f9tnn4X2hw4qzTBcupIRmEqY",
    authDomain: "sim-alpha-864fc.firebaseapp.com",
    databaseURL: "https://sim-alpha-864fc-default-rtdb.firebaseio.com",
    projectId: "sim-alpha-864fc",
    storageBucket: "sim-alpha-864fc.appspot.com",
    messagingSenderId: "103414692392",
    appId: "1:103414692392:web:dfb25e077c8c724297d31d",
    measurementId: "G-ER5KNHLJRM"
};

if (!firebase.apps?.length) {
    firebase.initializeApp(firebaseConfig);
    if (window.localStorage.refreshToken && window.localStorage.refreshToken !== 'undefined') {
        firebase.auth().signInWithCustomToken(window.localStorage.refreshToken);
    }
}

const history = createBrowserHistory();

type Props = {};

type State = { currentUser: any }


const description = '' +
    'This is the human simulation, where the public (you) has control of me for the entire period of the game. ' +
    'Authenticate to vote, or just watch here.';

const footerDescription = `` +
    `The abbreviated word 'Sim' in 'The Human Sim' is short for simulation. ` +
    `The Human Sim is not affiliated in any way with The Sims game franchise, its developers, or Electronic Arts.`;
class AppView extends React.Component<Props, State> {

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
                    {user || currentUser
                        ? <div>
                            <NavBar />
                            <div style={isMobile ? { paddingRight: 20, paddingLeft: 20 } : {}}>
                                <Switch>
                                    <Route path="/" exact component={Play} />
                                    <Route path="/play" exact component={Play} />
                                    <Route path="/the-rules" exact component={Rules} />
                                    <Route path="/about-me" exact component={Pointers} />
                                </Switch>
                            </div>
                        </div>
                        : <div className='welcome-screen'>
                            <h2>Welcome to The Human Sim</h2>
                            <p>{description}</p>
                            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                            <div style={{ marginTop: 15 }}>
                                <TwitchEmbed width={'100%'} height={'60vh'} channel={'christhesim'} withChat={false} />
                            </div>
                        </div>
                    }
                </div>
                <footer><p className={'footertext'}>{footerDescription}</p></footer>
            </Router>
        );
    }
};

export default AppView;