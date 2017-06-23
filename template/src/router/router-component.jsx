import Home from '../views/testing/home/home';
import Test from '../views/testing/home_1/test';
import Form from '../views/testing/form/playground';
import TableShow from '../views/testing/table/animation';
import PatinationShow from '../views/testing/patination/patination';
import DateRangeTest from '../views/testing/DateRangeTest';
import TimerTest from '../views/testing/TimerTest';
import Vertical from '../views/testing/VerticalScrollViewTest';
import Swapper from '../views/testing/swapper';
import Stocks from '../views/testing/stocks/stocksTest';

const routes = [
  {
    path: '/home/go',
    id: 'Home_1',
    component: Test,
    routes: [
      {
        path: '/home',
        id: 'home',
        component: Home
      },
    ]
  },
  {
    path: '/home',
    id: 'home',
    component: Home
  },
  {
    path: '/test',
    id: 'test',
    component: Test
  },
  {
    path: '/form',
    id: 'form',
    component: Form
  },
  {
      path: '/table',
      id: 'table',
      component: TableShow
  },
  {
      path: '/patination/:id',
      id: 'patination',
      component: PatinationShow,
      isNotexact: true
  },
  {
      path: '/dateRangeTest',
      id: 'DateRangeTest',
      component: DateRangeTest
  },
  {
      path: '/timerTest',
      id: 'TimerTest',
      component: TimerTest
  },
  {
      path: '/vertical',
      id: 'Vertical',
      component: Vertical
  },
  {
      path: '/swapper',
      id: 'Swapper',
      component: Swapper
  },
  {
      path: '/stocks',
      id: 'stocks',
      component: Stocks
  },
  {
    path: '/',
    id: 'app',
    component: Home
  }
];

export default routes;
