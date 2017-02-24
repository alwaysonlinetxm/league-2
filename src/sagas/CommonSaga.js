import { put, call, takeEvery } from 'redux-saga/effects';
import ActionTypes from '../constants/ActionTypes';
import Util from '../libs/util';

const callApi = Util.callApi.bind(Util);

function* request() {
  yield takeEvery(ActionTypes.REQUEST, function* (action) {
    const { url, methed, data, success, error, start, callback } = action.payload;

    if (start) {
      yield put({
        type: start,
        payload: data
      });
    }

    const res = yield call(callApi, url, methed || 'GET', data);
    typeof callback === 'function' && callback(res);

    if (res) {
      yield put({
        type: success,
        payload: res
      });
    } else {
      if (error) {
        yield put({
          type: error,
          payload: {}
        });
      }
    }
  });
}

export { request };
