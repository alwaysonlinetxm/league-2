import { injectAsyncReducer, injectAsyncSaga } from '../../stores/Store';

module.exports = {
  path: '/demaxiya',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      injectAsyncReducer({
        demaxiya: require('../../reducers/DemaxiyaReducer')
      });
      injectAsyncSaga(require('../../sagas/DemaxiyaSaga'));
      cb(null, require('./Demaxiya'));
    });
  }
};
