import { all } from 'redux-saga/effects'
import UsersSagas from './users'

// by having yield all within the rootSaga, it will allow the forked processes
// to all be created in parallel
export default function* rootSaga() {
  // Yield all is similar to Promise.resolveAll -- it only does something
  // once all promises have been resolved, except here, we're doing it
  // with the forked processes
  yield all([
    // create a new array from the UsersSagas array
    ...UsersSagas
  ])
}