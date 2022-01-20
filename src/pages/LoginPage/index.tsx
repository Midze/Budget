import React, { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Card from '../../components/Card';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loginUser, getUser } from '../../data/reducers/UserSlice';
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
  const message = useAppSelector(state => state.users.error);
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
    dispatch(loginUser({
      ...formData,
      email: formData.email.toLowerCase(),
    }));    
  };

  useEffect(() => {
    if(!userId) {
      const userIdFromToken = checkAuth();
      if (userIdFromToken) {
        dispatch(getUser({ id: userIdFromToken }));
      } else setIsLoading(false);
    }
  }, []);
  
  // const onFocusHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
  //   e.currentTarget.removeAttribute('readonly');
  //   e.currentTarget.autocomplete = 'off';
  // };
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
                // readOnly
                onChange={handleInputChange}
                // onFocus={onFocusHandler}
              />
              <input
                className='login-form__input'
                type="password"
                placeholder='Password'
                name='password'
                value={formData.password}
                // readOnly
                onChange={handleInputChange}
                // onFocus={onFocusHandler}
              />
              <input className='login-form__button' type="submit" value="Login" />
            </form>
            <div className="error">{message}</div>
          </Card>}
        </div> 
      }
    </>
  );
};

export default LoginPage;
