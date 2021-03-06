import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../store/user';
import InputWithValidation from '../../components/InputWithValidation/InputWithValidation';
import WithLoadingDelay from '../../components/withLoadingDelay/withLoadingDelay';
import './Auth.css';

function Auth() {
  const dispatch = useDispatch();
  const [emailState, setEmailState] = useState({ value: '', valid: false });
  const [passwordState, setPasswordState] = useState({
    value: '',
    valid: false,
  });
  const formName = 'Login',
    signInButtonText = 'Sign in';
  const history = useHistory();

  const emailValidation = (enteredData) => {
    return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(
      enteredData
    );
  };

  const passwordValidation = (enteredData) => {
    return /^(?=.*\d)(?=.*[a-zA-Z])([^\s]){8,}$/.test(enteredData);
  };

  const signInHandler = () => {
    dispatch(
      login({
        email: emailState.value,
        password: passwordState.value,
      })
    );
    history.push('/');
  };

  const changeEmailHandler = (enteredData) => {
    setEmailState({ value: enteredData.value, valid: enteredData.valid });
  };

  const changePasswordHandler = (enteredData) => {
    setPasswordState({ value: enteredData.value, valid: enteredData.valid });
  };

  return (
    <div className="auth-page-container">
      <div className="auth-container">
        <span>{formName}</span>
        <InputWithValidation
          validation={emailValidation}
          className="auth-container-input"
          placeholder="Email..."
          onChange={changeEmailHandler}
          type="text"
        />
        <InputWithValidation
          validation={passwordValidation}
          className="auth-container-input"
          placeholder="Password..."
          onChange={changePasswordHandler}
          type="password"
        />
        <div>
          <button
            disabled={!emailState.valid || !passwordState.valid}
            onClick={signInHandler}
          >
            {signInButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
export const AuthWithDelay = WithLoadingDelay(
  Auth,
  'auth-container',
  'auth-page-container'
);
