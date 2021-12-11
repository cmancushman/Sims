import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAhakJl7tKS8oIqzEVA0MSrJzpzgjXn3E0",
    authDomain: "web3-credit-scores.firebaseapp.com",
    projectId: "web3-credit-scores",
    storageBucket: "web3-credit-scores.appspot.com",
    messagingSenderId: "88589000398",
    appId: "1:88589000398:web:1d6c506daafe5a7a8b3a9f",
};

export const initializeFirebase = () => {
    if (!firebase.apps?.length) {
        firebase.initializeApp(firebaseConfig);
        if (window.localStorage.refreshToken && window.localStorage.refreshToken !== 'undefined') {
            firebase.auth().signInWithCustomToken(window.localStorage.refreshToken);
        }
    }
}