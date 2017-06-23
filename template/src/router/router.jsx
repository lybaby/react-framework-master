import Home from '../views/home/home';

const routes = [
  {
    path: '/home',
    id: 'home',
    component: Home
  },
  {
    path: '/',
    id: 'app',
    component: Home
  }
];

export default routes;
