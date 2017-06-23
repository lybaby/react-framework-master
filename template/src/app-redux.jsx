import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './css/main.scss';
import routes from './router/router';
import reducer from './redux/reducer';


const store = createStore(reducer);

const RouteWithSubRoutes = (route) => (
  <Route
    path={route.path}
    exact
    render={props => (
      <route.component {...props} routes={route.routes} />)}
  />);

const RouteConfig = () => (
  <Provider store={store}>
    <Router>
      <div className="main">
        {routes.map((route) =>
          (<RouteWithSubRoutes key={route.id} {...route} />)
        )}
      </div>
    </Router>
  </Provider>
);


export default RouteConfig;
