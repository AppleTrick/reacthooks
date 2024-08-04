'use client';

import { useInput } from '@/app/custom/useInput';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';

function displayMessage(message: string) {
  alert(message);
}

const CustomHook = () => {
  // const [inputValue, setInputValue] = useState('');

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  // };

  const [inputValue, handleChange, handleSubmit] = useInput('', displayMessage);

  // const handleSubmit = () => {
  //   alert(inputValue);
  // };

  return (
    <div>
      <h1>useInput</h1>
      <input value={inputValue} onChange={handleChange} />
      <button onClick={handleSubmit}>확인</button>
    </div>
  );
};

export default CustomHook;
