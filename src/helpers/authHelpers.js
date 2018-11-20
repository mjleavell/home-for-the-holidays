import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = (initializeFriendsPage) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#friends').hide();
      $('#holidays').show();
      $('#auth').hide();
      $('#navbar-button-auth').hide();
      $('#navbar-button-holidays').show();
      $('#navbar-button-friends').show();
      $('#navbar-button-logout').show();
      initializeFriendsPage();
    } else {
      $('#friends').hide();
      $('#holidays').hide();
      $('#auth').show();
      $('#navbar-button-auth').hide();
      $('#navbar-button-holidays').hide();
      $('#navbar-button-friends').hide();
      $('#navbar-button-logout').hide();
    }
  });
};

const getCurrentUid = () => firebase.auth().currentUser.uid;

export default { checkLoginStatus, getCurrentUid };
