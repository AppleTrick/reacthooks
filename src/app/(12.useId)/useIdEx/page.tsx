'use client';

import { useId } from 'react';

const UseIdEx = () => {
  return (
    <div>
      <MyName />
      {/* <MyName /> */}
    </div>
  );
};

export default UseIdEx;

const MyName = () => {
  const id = useId();

  return (
    <div>
      <label htmlFor={`${id}-name`}>이름</label>
      <input id={`${id}-name`} />
      <br />
      <label htmlFor={`${id}-age`}>나이</label>
      <input id={`${id}-age`} />
    </div>
  );
};
