import React from 'react';
import SigninWrapper from '../components/SigninWrapper';
import Login from '../components/Login';

const SignIn = () => {
  return <div>
    <SigninWrapper image={false} Element={Login}/>
  </div>;
};

export default SignIn;
