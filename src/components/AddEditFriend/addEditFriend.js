import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import friendsData from '../../helpers/Data/friendsData';
import initializeFriendsPage from '../FriendsPage/friendsPage';

const formBuilder = (friend) => {
  const formString = `
    <div class="form-group">
      <label for="form-friend-name">Name:</label>
      <input type="text" class="form-control" value="${friend.name}" id="form-friend-name" placeholder="George Washington">
    </div>
    <div class="form-group">
      <label for="form-friend-address">Address:</label>
      <input type="text" class="form-control" value="${friend.address}" id="form-friend-address" placeholder="30 Rockefellar Plaza, New York, NY">
    </div>
    <div class="form-group">
      <label for="form-friend-email">Email:</label>
      <input type="email" class="form-control" value="${friend.email}" id="form-friend-email" placeholder="test@email.com">
    </div>
    <div class="form-group">
      <label for="form-friend-phone">Phone Number:</label>
      <input type="text" class="form-control" value="${friend.phoneNumber}" id="form-friend-phone" placeholder="123-456-7890">
    </div>
    <div class="form-group">
      <label for="form-friend-relationship">Relationship:</label>
      <input type="text" class="form-control" value="${friend.relationship}" id="form-friend-relationship" placeholder="sister">
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
  const emptyFriend = {
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    relationship: '',
  };
  let domString = '<h2>Add New Friend</h2>';
  domString += formBuilder(emptyFriend);
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

//  Edit (1 func building form; 1 func going out to firebase)
const showEditForm = (e) => {
  const idToEdit = e.target.dataset.editId;
  friendsData.getSingleFriend(idToEdit)
    .then((singleFriend) => {
      let domString = '<h2>Edit Friend</h2>';
      domString += formBuilder(singleFriend);
      domString += `<button class="btn btn-primary" id="edit-friend" data-single-edit-id=${singleFriend.id}>Save Friend</button>`;
      $('#add-edit-friend').html(domString).show();
      $('#friends').hide();
    })
    .catch((error) => {
      console.error('error in showEditForm', error);
    });
};

const updateFriend = (e) => {
  const updatedFriend = gettingFriendFromForm();
  const friendId = e.target.dataset.singleEditId;
  friendsData.updateFriend(updatedFriend, friendId)
    .then(() => {
      $('#add-edit-friend').html('').hide();
      $('#single-container').html('');
      $('#friends').show();
      initializeFriendsPage();
    })
    .catch((error) => {
      console.error(error);
    });
};

// since we are adding event to the body, we are able to put the event
// listener on this page, not where button is created aka printed
$('body').on('click', '#add-friend', addNewFriend);
$('body').on('click', '.edit-btn', showEditForm);
$('body').on('click', '#edit-friend', updateFriend);

export default buildAddForm;
