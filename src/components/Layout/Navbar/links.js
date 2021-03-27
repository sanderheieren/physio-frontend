export default {
  notAuthorized: [
    {
      path: '/',
      text: 'Home',
      exact: true,
    },
    {
      path: '/login',
      text: 'Login',
    },
    {
      path: '/signup',
      text: 'Signup',
    },
    {
      path: '/about',
      text: 'About',
    },
  ],
  authorized: [
    {
      path: '/dashboard',
      text: 'Dashboard',
    },
    {
      path: '/account',
      text: 'Account',
    },
    {
      path: '/about',
      text: 'About',
    },
  ],
};
