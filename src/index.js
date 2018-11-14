import 'bootstrap';
import firebase from 'firebase/app';

import apiKeys from '../db/apiKeys.json';
import navbar from './components/Navbar/navbar';

import './index.scss';

const initApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbar();
};

initApp();
