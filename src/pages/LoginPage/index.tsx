import React, { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Card from '../../components/Card';
import jwt_decode from 'jwt-decode';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loginUser, getUser } from '../../store/reducers/UserSlice';
import './styles.css';
import checkAuth from '../../hooks/auth';

interface formData {
  email: string,
  password: string;
}

const initialFormData:formData = {
  email: '',
  password: '',
};

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.users.user._id);
  const isLoadingUsers = useAppSelector(state => state.users.isLoading);
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(isLoadingUsers);
  const handleInputChange:ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFormSubmit:FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(loginUser({...formData}));    
  };

  useEffect(() => {
    if(!userId) {
      const userIdFromToken = checkAuth();
      if (userIdFromToken) {
        dispatch(getUser({ id: userIdFromToken }));
      } else setIsLoading(false);
    }
  }, []);

  return (
    <>
      {userId ? <Redirect to='/dashboard'/> :
        <div className='login-page'>
          {isLoading ? 'Loading' : <Card title='Login' className='login-form__container'>
            <form className='login-form' onSubmit={handleFormSubmit}>
              <input
                className='login-form__input'
                type="text"
                placeholder='Email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                className='login-form__input'
                type="password"
                placeholder='Password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
              />
              <input className='login-form__button' type="submit" value="Login" />
            </form>
          </Card>}
        </div> 
      }
    </>
  );
};

export default LoginPage;
