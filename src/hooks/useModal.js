import { useState, useEffect } from 'react';

function useModal(time = 0, text = 'user prompt') {
  const [promptValue, setPromptValue] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPromptValue(prompt(text));
    }, time);
    return () => clearTimeout(timer);
  }, [text, time]);

  return promptValue;
}

export default useModal;
