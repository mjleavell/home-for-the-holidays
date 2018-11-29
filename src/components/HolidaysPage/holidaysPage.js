import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import holidaysData from '../../helpers/Data/holidaysData';
import './holidaysPage.scss';

const getSingleHoliday = (e) => {
  const holidayId = e.target.dataset.holidayBtnId;
  console.log(holidayId);
  holidaysData.getSingleHoliday(holidayId).then((singleHoliday) => {
    console.log(singleHoliday);
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
