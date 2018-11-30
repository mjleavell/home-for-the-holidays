// all of our crud stuff for FRIENDS should be in this file
// for HOLIDAYS you should have a separate data file
import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllFriends = uid => new Promise((resolve, reject) => {
  // the orderBy=firebase key and the equalTo value equals whatever youre passing in
  // if you have order by, you need to add indexOn rule in firebase
  axios.get(`${firebaseUrl}/friends.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const friendsObject = results.data;
      const friendsArray = [];
      if (friendsObject !== null) {
        Object.keys(friendsObject).forEach((friendId) => {
          friendsObject[friendId].id = friendId;
          friendsArray.push(friendsObject[friendId]);
        });
      }
      resolve(friendsArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleFriend = friendId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/friends/${friendId}.json`)
    .then((result) => {
      const singleFriend = result.data;
      singleFriend.id = friendId;
      resolve(singleFriend);
    })
    .catch((error) => {
      reject(error);
    });
});

const getFriendsByArrayOfIds = (uid, friendIdsArray) => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/friends.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const friendObject = result.data;
      const friendsArray = [];
      if (friendObject != null) {
        Object.keys(friendObject).forEach((friendId) => {
          friendObject[friendId].id = friendId;
          friendsArray.push(friendObject[friendId]);
        });
        const selectedFriends = friendsArray.filter(x => friendIdsArray.includes(x.id));
        resolve(selectedFriends);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

const deleteFriend = friendId => axios.delete(`${firebaseUrl}/friends/${friendId}.json`);

const getNewFriend = friendObject => axios.post(`${firebaseUrl}/friends.json`, JSON.stringify(friendObject));

const updateFriend = (friendObject, friendId) => axios.put(`${firebaseUrl}/friends/${friendId}.json`, JSON.stringify(friendObject));

const updatedIsAvoiding = (friendId, isAvoiding) => axios.patch(`${firebaseUrl}/friends/${friendId}.json`, { isAvoiding });

export default {
  getAllFriends,
  getSingleFriend,
  deleteFriend,
  getNewFriend,
  updateFriend,
  updatedIsAvoiding,
  getFriendsByArrayOfIds,
};
