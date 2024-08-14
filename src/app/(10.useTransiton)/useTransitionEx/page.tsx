'use client';

import { ChangeEvent, useState } from 'react';

const UseTransitionEx = () => {
  const [text, setText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // 바로바로 작동
  return (
    <div>
      <input type="text" onChange={handleChange} />
      <p>{text}</p>
    </div>
  );
};

export default UseTransitionEx;
