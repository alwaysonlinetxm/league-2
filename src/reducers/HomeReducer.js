import { handleActions } from 'redux-actions';
import Immutable from 'seamless-immutable';
import ActionTypes from '../constants/ActionTypes';

const initState = Immutable({
  list: [],
  total: 0,
  text: 'lalala'
});

export default handleActions({
  [ActionTypes.GET_MEMBER]: (state, action) => state.merge({ list: action.payload })
}, initState);
