import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import holidaysData from '../../helpers/Data/holidaysData';
import './holidaysPage.scss';

// date, holiday, picture, location, time, list of guests. buttons for edit, delete, and add people
// "name": "Thanksgiving",
// "date": "11/22/2018",
// "imageUrl": "https://www.sonomamag.com/biteclub/wp-content/uploads/2016/11/turkeydinner-1024x692.jpg",
// "location": "768 5th Ave, New York, NY 10019",
// "startTime": "1pm",
// "uid": "7wtYOqGGEtS7dx6VAby70Efklkk2"
const printSingleHoliday = (singleHoliday) => {
  const holidayString = `
  <div class="row holiday">
    <div class="col-md-5 holiday-text">
      <h3>${singleHoliday.name}</h3>
      <p><strong>Date:</strong> ${singleHoliday.date}</p>
      <p><strong>Location:</strong> ${singleHoliday.location}</p>
      <p><strong>Time:</strong> ${singleHoliday.startTime}</p>
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
  $('#holidays-display').html(holidayString);
};

const getSingleHoliday = (e) => {
  const holidayId = e.target.dataset.holidayBtnId;
  console.log(holidayId);
  holidaysData.getSingleHoliday(holidayId).then((singleHoliday) => {
    printSingleHoliday(singleHoliday);
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

$('body').on('click', '.holiday-btn', getSingleHoliday);

export default holidaysPage;
