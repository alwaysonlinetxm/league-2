import { createActions } from 'redux-actions';
import ActionTypes from '../constants/ActionTypes';

export default createActions({
  [ActionTypes.GET_HERO]: list => ({ list })
});
