import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import App from './app';
// import App from './test/components/DateRangeTest'
import registerServiceWorker from './registerServiceWorker';
import './css/main.scss';

// 移动端使用需要引用该文件
// import './common/rem';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
