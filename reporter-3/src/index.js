import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { FireContextProvider } from './Components/FireContextProvider';
import { TodayContextProvider } from './Components/TodayContextProvider';

ReactDOM.render(
    <FireContextProvider>
        <TodayContextProvider>
            <App />
        </TodayContextProvider>
    </FireContextProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
