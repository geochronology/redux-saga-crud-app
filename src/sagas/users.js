import { takeEvery, call, fork, put } from 'redux-saga/effects'
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

const usersSagas = [
  // explanation of forks is at 6min mark in section 10 of video; diagram is also in folder;
  // a fork creates a *forked* process, which run in parallel
  fork(watchGetUsersRequest)
]

export default usersSagas