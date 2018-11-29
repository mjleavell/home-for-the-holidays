import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllHolidays = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/holidays.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const holidaysObject = result.data;
      const holidaysArray = [];
      if (holidaysObject !== null) {
        Object.keys(holidaysObject).forEach((holidayId) => {
          holidaysObject[holidayId].id = holidayId;
          holidaysArray.push(holidaysObject[holidayId]);
        });
      }
      resolve(holidaysArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const getSingleHoliday = holidayId => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/holidays/${holidayId}.json`)
    .then((result) => {
      const singleHoliday = result.data;
      singleHoliday.id = holidayId;
      resolve(singleHoliday);
    })
    .catch((err) => {
      reject(err);
    });
});

const getHolidaysByArrayOfIds = (uid, holidayIdsArray) => new Promise((resolve, reject) => {
  // line 8 will return all the holidays that belong to my user
  axios.get(`${baseUrl}/holidays.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const holidaysObject = result.data;
      const holidaysArray = [];
      if (holidaysObject != null) {
        Object.keys(holidaysObject).forEach((holidayId) => {
          // creating a new property on line 15 bc we missing holidayId; only have key
          holidaysObject[holidayId].id = holidayId;
          holidaysArray.push(holidaysObject[holidayId]);
        });
      }
      // console.log('holidayIdsArray', holidayIdsArray);
      // console.log('holidays', holidaysArray);
      // filters the holiday array & keeping anything in holidayIdsArray that includes x.id
      const selectedHolidays = holidaysArray.filter(x => holidayIdsArray.includes(x.id));
      resolve(selectedHolidays);
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  getHolidaysByArrayOfIds,
  getAllHolidays,
  getSingleHoliday,
};
