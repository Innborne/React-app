import { useState } from 'react';

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
      className={props.className}
      style={{
        borderBottomColor: !isValid && inputIsTouched && 'rgb(255, 129, 129)',
      }}
      onChange={changeEmailHandler}
      onBlur={onBlurHandler}
      placeholder={props.placeholder}
      type={props.type}
    />
  );
};

export default InputWithValidation;
