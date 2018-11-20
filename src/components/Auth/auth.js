import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

import googleImage from './sign-in-with-google.png';
import './auth.scss';

const loginButton = () => {
  const domString = `
    <button id="google-auth" class="btn btn-outline-light">
      <img src="${googleImage}"></img>
    </button>`;
  $('#auth').html(domString);
  $('#google-auth').on('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
};

export default loginButton;
