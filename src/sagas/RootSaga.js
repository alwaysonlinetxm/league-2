import { fork } from 'redux-saga/effects';
import { request } from './CommonSaga';
export default function* rootSaga() {
  yield fork(request);
}
