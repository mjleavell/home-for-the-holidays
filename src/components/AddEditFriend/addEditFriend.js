import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import friendsData from '../../helpers/Data/friendsData';
import initializeFriendsPage from '../FriendsPage/friendsPage';

const formBuilder = () => {
  const formString = `
    <div class="form-group">
      <label for="form-friend-name">Name:</label>
      <input type="text" class="form-control" id="form-friend-name" placeholder="George Washington">
    </div>
    <div class="form-group">
      <label for="form-friend-address">Addres:</label>
      <input type="text" class="form-control" id="form-friend-address" placeholder="30 Rockefellar Plaza, New York, NY">
    </div>
    <div class="form-group">
      <label for="form-friend-email">Email:</label>
      <input type="email" class="form-control" id="form-friend-email" placeholder="test@email.com">
    </div>
    <div class="form-group">
      <label for="form-friend-phone">Phone Number:</label>
      <input type="text" class="form-control" id="form-friend-phone" placeholder="123-456-7890">
    </div>
    <div class="form-group">
      <label for="form-friend-relationship">Relationship:</label>
      <input type="text" class="form-control" id="form-friend-relationship" placeholder="sister">
    </div>`;
  return formString;
};

const gettingFriendFromForm = () => {
  const friend = {
    name: $('#form-friend-name').val(),
    address: $('#form-friend-address').val(),
    email: $('#form-friend-email').val(),
    phoneNumber: $('#form-friend-phone').val(),
    relationship: $('#form-friend-relationship').val(),
    isAvoiding: false,
    uid: authHelpers.getCurrentUid(),
  };
  return friend;
};

const buildAddForm = () => {
  let domString = '<h2>Add New Friend</h2>';
  domString += formBuilder();
  domString += '<button class="btn btn-primary" id="add-friend">Save New Friend</button>';
  $('#add-edit-friend').html(domString).show();
  $('#friends').hide();
};

const addNewFriend = () => {
  const newFriend = gettingFriendFromForm();
  friendsData.getNewFriend(newFriend)
    .then(() => {
      $('#add-edit-friend').html('').hide();
      $('#friends').show();
      initializeFriendsPage();
    })
    .catch((error) => {
      console.error(error);
    });
};

$('body').on('click', '#add-friend', addNewFriend);

export default buildAddForm;
