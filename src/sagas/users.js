import { act } from 'react-dom/test-utils'
import { takeEvery, takeLatest, call, fork, put } from 'redux-saga/effects'
import * as actions from '../actions/users'
import * as api from '../api/users'

function* getUsers() {
  try {
    // once the <call> to api.getUsers resolves, it's going to assign the result to result;
    // any code in the block afterwards will be run once the call has resolved
    const result = yield call(api.getUsers)

    // load results of api call into redux state
    yield put(actions.getUsersSuccess({
      items: result.data.data
    }))
  } catch (e) { }
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

  }
}


// takeLatest: cancels unresolved requests and replaces with new ones
function* watchCreateUserRequest() {
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser)
}

const usersSagas = [
  // explanation of forks is at 6min mark in section 10 of video,
  // and a diagram is also in folder;
  // tldr: a fork creates a *forked* process, which run in parallel
  fork(watchGetUsersRequest),
  fork(watchCreateUserRequest)
]

export default usersSagas