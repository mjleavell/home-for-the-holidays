import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getHolidayIdsForFriend = friendId => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/holidayFriends.json?orderBy="friendId"&equalTo="${friendId}"`)
    .then((result) => {
      const holidayFriendsObject = result.data;
      const holidayIds = [];
      // do some stuff
      if (holidayFriendsObject != null) {
        Object.keys(holidayFriendsObject).forEach((hfId) => {
          // we just want to push the holidayId. dont care about friendId here
          holidayIds.push(holidayFriendsObject[hfId].holidayId);
        });
      }
      resolve(holidayIds);
    })
    .catch((err) => {
      reject(err);
    });
});

export default { getHolidayIdsForFriend };
