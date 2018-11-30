import $ from 'jquery';
import './holidayPageModal.scss';

const displayAddGuestModal = (friendsArray) => {
  let modalString = '';
  modalString += `
  <div class="modal fade" id="guest-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Guest</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">`;
  friendsArray.forEach((friend) => {
    modalString += `
    <input class="form-check-input modal-name" type="checkbox" value="" id="${friend.id}">
    <label class="form-check-label modal-name" for="defaultCheck1">${friend.name}</label>`;
  });
  modalString += `
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>`;
  $('#holidays-guest-modal').html(modalString);
  // return modalString;
};

export default { displayAddGuestModal };
