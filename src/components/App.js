import React from 'react';
import { connect } from 'react-redux'
import { getUsersRequest } from '../actions/users'

// (Application lifecycle explained in Section 12)
// 1. When we render the app, we fire the getUsersRequest redux action
// 2. In sagas/users.js, because watchGetUsersRequest watcher saga is 
//    watching for every time the GET_USERS_REQUEST redux action is 
//    being dispatched, we then act upon that with a getUsers worker saga
// 3. getUsers will call the api to get the users and will log the result

function App({ getUsersRequest }) {
  getUsersRequest()
  return (
    <div>
      Test
    </div>
  );
}

// this seems to have the effect of adding getUsersRequest
// to the App component passed in as props
export default connect(null, {
  getUsersRequest
})(App);
