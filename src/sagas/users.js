import { act } from 'react-dom/test-utils'
import { takeEvery, takeLatest, take, call, fork, put } from 'redux-saga/effects'
import * as actions from '../actions/users'
import * as api from '../api/users'

function* getUsers() {
  // the reason for putting the code in try/catch blocks is to
  // prevent the error from bubbling up to the root saga, which
  // could then potentially cause other errors
  try {
    // once the <call> to api.getUsers resolves, it's going to assign the result to result;
    // any code in the block afterwards will be run once the call has resolved
    const result = yield call(api.getUsers)

    // load results of api call into redux state
    yield put(actions.getUsersSuccess({
      items: result.data.data
    }))
  } catch (e) {
    yield put(actions.usersError({
      error: 'An error occured when get tang'
    }))
  }
}

// This is a watcher saga. It watches when one particular redux action 
// has been dispatched, and then acts upon that action by calling a
// worker saga (in this case, getUsers is the worker saga).
function* watchGetUsersRequest() {
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers)
}

// This saga extracts properties from the dispatched redux action
function* createUser(action) {
  try {
    // The way call works: if we want to call arguments against the api,
    // then they get passed in afterwards as additional arguments
    yield call(api.createUser, {
      firstName: action.payload.firstName,
      lastName: action.payload.lastName
    })
    // call the getUsers saga again, which will update the state with
    // the latest users
    yield call(getUsers)
  } catch (err) {
    yield put(actions.usersError({
      error: 'An error occured when creatang'
    }))
  }
}

// takeLatest: cancels unresolved requests and replaces with new ones
function* watchCreateUserRequest() {
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser)
}

function* deleteUser({ userId }) {
  try {
    yield call(api.deleteUser, userId);
    yield call(getUsers);
  } catch (err) {
    yield put(actions.usersError({
      error: 'An error occured when deleeting'
    }))
  }
}

// take is a lower level effect 
function* watchDeleteUserRequest() {
  // until this resolves, we're unable to come back into the while loop
  while (true) {
    const action = yield take(actions.Types.DELETE_USER_REQUEST)
    yield call(deleteUser, {
      userId: action.payload.userId
    })
  }
}


const usersSagas = [
  // explanation of forks is at 6min mark in section 10 of video,
  // and a diagram is also in folder;
  // tldr: a fork creates a *forked* process, which run in parallel
  fork(watchGetUsersRequest),
  fork(watchCreateUserRequest),
  fork(watchDeleteUserRequest)
]

export default usersSagas