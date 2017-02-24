import { take, put } from 'redux-saga/effects';
import ActionTypes from '../constants/ActionTypes';
import { request } from '../actions/CommonActions';

function* getHero() {
  while (true) {
    yield take(ActionTypes.GET_HERO);
    yield put(request({
      url: '//offline-news-api.herokuapp.com/stories',
      success: ActionTypes.GET_HERO_SUCCESS
    }));
  }
}

export { getHero };
