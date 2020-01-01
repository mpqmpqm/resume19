import React from 'react'
import firebase from 'firebase'
import 'firebase/database'

const fireConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

const FireContext = React.createContext()
const firebaseApp = firebase.initializeApp(fireConfig);

const FireContextProvider = (props) => {

    return (
        <FireContext.Provider value = {firebaseApp}>
            {props.children}
        </FireContext.Provider>
    )
}

export {FireContextProvider, FireContext}