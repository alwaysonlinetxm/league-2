import Inferno from 'inferno';
import { Provider } from 'inferno-redux';
// import { Router, Route, IndexRoute } from 'inferno-router';
// import createHashHistory from 'history/createHashHistory';
import Store, { injectAsyncReducer } from '../stores/Store';
import Root from './Root';

import Router from 'react-router/lib/Router';
import hashHistory from 'react-router/lib/hashHistory';

const rootRoute = {
  path: '/',
  component: Root,
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        injectAsyncReducer({
          home: require('../reducers/HomeReducer')
        });
        cb(null, require('../routes/home/Home'));
      });
    }
  },
  childRoutes: [
    require('../routes/home'),
    require('../routes/demaxiya')
  ]
};

Inferno.render(
  <Provider store={ Store }>
    <Router history={ hashHistory } routes={ rootRoute } />
  </Provider>,
  document.getElementById('app')
);
