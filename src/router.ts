import React from 'react';

const SignUp = React.lazy(() => import('./components/auth/SignIn'));
const Signin = React.lazy(() => import('./components/auth/SignIn'));

const route = [
    { path: '/auth/signup-1', exact: true, name: 'Signup 1', component: SignUp },
    { path: '/auth/signin-1', exact: true, name: 'Signin 1', component: Signin }
];

export default route;