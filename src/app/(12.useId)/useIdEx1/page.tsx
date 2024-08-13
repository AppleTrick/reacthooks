'use client';

import { useEffect, useId } from 'react';

const UseIdEx = () => {
  return (
    <div>
      <MyName />
    </div>
  );
};

export default UseIdEx;

const MyName = () => {
  const id = useId();

  useEffect(() => {
    // const element = document.querySelector('#btn');
    // console.log(element);

    const element = document.querySelector(id);
    console.log(element);
  }, []);

  return (
    <div>
      <button id="button">버튼</button>
      <label htmlFor={`${id}`}>이름</label>
      <input id={`${id}`} />
    </div>
  );
};
