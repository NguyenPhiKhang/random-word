import {initializeApp} from 'firebase/app';

// Your web app's Firebase configuration
const config = {
    apiKey: "AIzaSyAD_dNEmyQqWGeGaJRnqHLbZCRWln6L5r8",
    authDomain: "db-word-translate.firebaseapp.com",
    projectId: "db-word-translate",
    storageBucket: "db-word-translate.appspot.com",
    messagingSenderId: "433221155722",
    appId: "1:433221155722:web:f362693fc7be8cf362a673"
};

// Initialize Firebase

const firebase = initializeApp(config);

export default firebase;