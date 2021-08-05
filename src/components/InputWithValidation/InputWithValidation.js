import { useState } from 'react';
import classNames from 'classnames';

import './InputWithValidation.css';

const InputWithValidation = (props) => {
  const [inputIsTouched, setInputIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const onBlurHandler = () => {
    setInputIsTouched(true);
  };

  const changeEmailHandler = (event) => {
    const valid =
      props.validation(event.target.value) && event.target.value.trim() !== '';
    setIsValid(valid);
    props.onChange({
      value: event.target.value,
      valid: valid,
    });
  };

  return (
    <input
      className={classNames(props.className, {
        invalid: !isValid && inputIsTouched,
      })}
      onChange={changeEmailHandler}
      onBlur={onBlurHandler}
      placeholder={props.placeholder}
      type={props.type}
    />
  );
};

export default InputWithValidation;
