import React from 'react'
import { useDispatch } from 'react-redux';
import { sendUserAuthRequest } from '../../api-helper/api-helpers';
import { userActions } from '../../store';
import AuthForm from './AuthForm'


const Auth = () => {
  const dispatch=useDispatch();
  const onResponseRecived=(data)=>{
    console.log(data);
    dispatch(userActions.login());
    localStorage.setItem("userId",data.id);
  }
  const getData=(data)=>{
    console.log("Calling to",data);
    sendUserAuthRequest(data.inputs,data.signup)
    .then(onResponseRecived)
    .catch(err=>{console.log(err)})
  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false}/>
    </div>
  )
}

export default Auth
