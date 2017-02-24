import { handleActions } from 'redux-actions';
import Immutable from 'seamless-immutable';
import ActionTypes from '../constants/ActionTypes';

const initState = Immutable({
  list: []
});

export default handleActions({
  [ActionTypes.GET_HERO_SUCCESS]: (state, action) => state.merge({ list: action.payload })
}, initState);
