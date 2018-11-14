import firebase from 'firebase/app';
import 'bootstrap';

import apiKeys from '../db/apiKeys.json';
import createNavbar from './components/Navbar/navbar';
import loginButton from './components/Auth/auth';

import './index.scss';

const initApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavbar();
  loginButton();
};

initApp();
