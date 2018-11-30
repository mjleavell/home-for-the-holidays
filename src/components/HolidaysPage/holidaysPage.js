import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import holidaysData from '../../helpers/Data/holidaysData';
import './holidaysPage.scss';
import holidayFriendsData from '../../helpers/Data/holidayFriendsData';
import friendsData from '../../helpers/Data/friendsData';

const printSingleHoliday = (singleHoliday, friendsArray) => {
  let holidayString = '';
  holidayString += `
  <div class="row holiday">
    <div class="col-md-5 holiday-text">
      <h3 class="holiday-name">${singleHoliday.name}</h3>
      <p><strong>Date:</strong> ${singleHoliday.date}</p>
      <p><strong>Location:</strong> ${singleHoliday.location}</p>
      <p><strong>Time:</strong> ${singleHoliday.startTime}</p>
      <div id="holidays-guests" class="text-left">
        <h4 class="holiday-guest-title">Invited Guests</h4>
        <ul>`;
  friendsArray.forEach((friend) => {
    holidayString += `<li class="friend-name" style="color:${friend.isAvoiding === true ? 'red' : 'black'}">${friend.name}</li>`;
  });
  holidayString += `
        </ul>
      </div>
      <div class="row card-body">
        <button class="btn btn-success single-holiday-btn" data-holiday-edit-btn=${singleHoliday.id}>Edit Holiday</button>
        <button class="btn btn-danger single-holiday-btn" data-holiday-delete-btn=${singleHoliday.id}>Delete Holiday</button>
        <button class="btn btn-secondary single-holiday-btn" id="holiday-add-guest-btn">Add Guest</button>
      </div>
    </div>
    <div class="col-md-7 p-2">
      <img class="img-fluid mb-3 mb-md-0 proj-img" src="${singleHoliday.imageUrl}" style="border: 2px outset black;" alt="">
    </div>
  </div>`;
  $('#holidays-info').html(holidayString);
};

const getSingleHoliday = (e) => {
  const holidayId = e.target.dataset.holidayBtnId;
  const uid = authHelpers.getCurrentUid();
  // console.log(holidayId);
  holidaysData.getSingleHoliday(holidayId).then((singleHoliday) => {
    holidayFriendsData.getFriendIdsForHoliday(holidayId).then((friendIdsArray) => {
      friendsData.getFriendsByArrayOfIds(uid, friendIdsArray).then((friendsArray) => {
        console.log(friendsArray);
        printSingleHoliday(singleHoliday, friendsArray);
      });
    });
  });
};

const getHolidayButtons = (holidaysArray) => {
  let btnString = '';
  holidaysArray.forEach((holiday) => {
    btnString += `<button data-holiday-btn-id=${holiday.id} class="btn btn-dark holiday-btn">${holiday.name} ${holiday.date}</button>`;
  });
  $('#holidays-btns').html(btnString);
};

const holidaysPage = () => {
  const uid = authHelpers.getCurrentUid();
  holidaysData.getAllHolidays(uid).then((holidaysArray) => {
    getHolidayButtons(holidaysArray);
  });
};

const bindEvents = () => {
  $('body').on('click', '.holiday-btn', getSingleHoliday);
};

const initializeHolidaysPage = () => {
  holidaysPage();
  bindEvents();
};


export default initializeHolidaysPage;
