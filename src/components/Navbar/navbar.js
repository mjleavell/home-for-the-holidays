import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import './navbar.scss';

const navbarEvents = () => {
  $('.nav-link').on('click', (e) => {
    if (e.target.id === 'navbar-button-logout') {
      firebase.auth().signOut().then(() => {
        // need to have the .then because logout is an asynchronous request
        $('#auth').show();
        $('#friends').hide();
        $('#holidays').hide();
      }).catch((err) => {
        console.error('youre still logged in', err);
      });
    } else if (e.target.id === 'navbar-button-holidays') {
      $('#auth').hide();
      $('#friends').hide();
      $('#holidays').show();
    } else if (e.target.id === 'navbar-button-friends') {
      $('#auth').hide();
      $('#friends').show();
      $('#holidays').hide();
    } else {
      // click authentication
      $('#auth').show();
      $('#friends').hide();
      $('#holidays').hide();
    }
  });
};

const createNavbar = () => {
  const domString = `
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Home for the Holidays</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a id="navbar-button-auth" class="nav-link">Authentication</a>
        </li>
        <li class="nav-item">
          <a id="navbar-button-holidays" class="nav-link">Holidays</a>
        </li>
        <li class="nav-item">
          <a id="navbar-button-friends" class="nav-link">Friends</a>
        </li>
        <li class="nav-item">
          <a id="navbar-button-logout" class="nav-link">Logout</a>
        </li>
      </ul>
    </div>
  </nav>`;
  $('#navbar').html(domString);
  navbarEvents();
};

export default createNavbar;
