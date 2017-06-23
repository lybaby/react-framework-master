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
        <ul>
            <li><Link to="/home">弹窗、加载中</Link></li>
            <li><Link to="/form">表单</Link></li>
            <li><Link to="/table">表格</Link></li>
            <li><Link to="/dateRangeTest">时间</Link></li>
            <li><Link to="/timerTest">定时器</Link></li>
            <li><Link to="/vertical">下拉、上拉刷新</Link></li>
            <li><Link to="/patination/1">分页</Link></li>
            <li><Link to="/swapper">滚屏</Link></li>
            <li><Link to="/stocks">行情</Link></li>
        </ul>
        {routes.map((route) =>
        (<RouteWithSubRoutes key={route.id} {...route} />)
      )}
    </div>
  </Router>
);


export default RouteConfig;
