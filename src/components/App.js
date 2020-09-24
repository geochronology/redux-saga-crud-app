import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getUsersRequest, createUserRequest } from '../actions/users'
import UsersList from './UsersList'
import NewUserForm from './NewUserForm'

// (Application lifecycle explained in Section 12)
// 1. When we render the app, we fire the getUsersRequest redux action
// 2. In sagas/users.js, because watchGetUsersRequest watcher saga is 
//    watching for every time the GET_USERS_REQUEST redux action is 
//    being dispatched, we then act upon that with a getUsers worker saga
// 3. getUsers will call the api to get the users and will log the result

function App({ getUsersRequest, createUserRequest, users }) {

  useEffect(() => {
    getUsersRequest()
  }, [])

  const handleSubmit = ({ firstName, lastName }) => {
    createUserRequest({
      firstName,
      lastName
    })
  }

  return (
    <div style={{ margin: '0 auto', padding: '20px', maxWidth: '600px' }}>
      <NewUserForm onSubmit={handleSubmit} />
      <UsersList users={users.items} />
    </div>
  );
}

// MAPPING TO THE PROPS
// take users from store and make it accessible as props
export default connect(({ users }) => ({ users }), {
  getUsersRequest,
  createUserRequest
})(App);
