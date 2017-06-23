import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './css/main.scss';
import routes from './router/router';
// import './common/rem';

const RouteWithSubRoutes = (route) => {
    if (route.isNotexact) {
       return (<Route
            path={route.path}
            render={props => (
                <route.component {...props} routes={route.routes} />)}
       />);
    }
    return (<Route
        path={route.path}
        exact
        render={props => (
            <route.component {...props} routes={route.routes} />)}
    />);
};

const RouteConfig = () => (
  <Router>
    <div className="main">
        {routes.map((route) =>
        (<RouteWithSubRoutes key={route.id} {...route} />)
      )}
    </div>
  </Router>
);


export default RouteConfig;
