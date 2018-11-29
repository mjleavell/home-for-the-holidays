import firebase from 'firebase/app';
import $ from 'jquery';
import 'bootstrap';

import apiKeys from '../db/apiKeys.json';

import createNavbar from './components/Navbar/navbar';
import loginButton from './components/Auth/auth';
import authHelpers from './helpers/authHelpers';
import friendsPage from './components/FriendsPage/friendsPage';
import showAddForm from './components/AddEditFriend/addEditFriend';

import './index.scss';
import holidaysPage from './components/HolidaysPage/holidaysPage';

const initApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavbar();
  authHelpers.checkLoginStatus(friendsPage, holidaysPage);
  loginButton();
  $('#show-friend-form').on('click', showAddForm);
};

initApp();
