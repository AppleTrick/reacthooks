import { ChangeEvent, useState } from 'react';

export function useInput(initialValue: string, submitAction: (message: string) => void): [string, (e: ChangeEvent<HTMLInputElement>) => void, () => void] {
  // custom hook 을 만들때에는 함수 이름 앞에 use를 작성해준다.

  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    setInputValue('');
    submitAction(inputValue);
  };

  return [inputValue, handleChange, handleSubmit];
}
