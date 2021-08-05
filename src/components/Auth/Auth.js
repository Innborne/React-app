import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import WithLoadingDelay from '../withLoadingDelay/withLoadingDelay';
import './Auth.css';

const AuthWithDelayStyle = styled.div`
  background-color: rgb(31, 31, 31);
  margin: auto;
  margin-bottom: 1rem;
  max-width: 95%;
  width: 50rem;
  min-height: 65vh;
  border-radius: 5px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
  display: flex;
`;

const AuthWithDelay = WithLoadingDelay(Auth, AuthWithDelayStyle);

function Auth() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPass] = useState('');
  const [isValid, setIsValid] = useState(false);
  const formName = 'Login',
    signInButtonText = 'Sign in';
  const history = useHistory();

  const signInHandler = () => {
    history.push('/');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsValid(
        enteredEmail.trim().length > 0 && enteredPassword.trim().length > 0
      );
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredEmail, enteredPassword]);

  const changeEmailHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const changePasswordHandler = (event) => {
    setEnteredPass(event.target.value);
  };

  return (
    <div className="auth-page-container">
      <div className="auth-container">
        <span>{formName}</span>
        <input
          placeholder="Email..."
          onChange={changeEmailHandler}
          type="text"
        />
        <input
          placeholder="Password..."
          onChange={changePasswordHandler}
          type="password"
        />
        <div>
          <button disabled={!isValid} onClick={signInHandler}>
            {signInButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
export { AuthWithDelay };
