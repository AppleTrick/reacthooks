'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';

const UseCallbackEx = () => {
  const [number, setNumber] = useState(0);

  //   const SomeFunc = () => {
  //     console.log(`어떤 함수 : ${number}`);
  //     return;
  //   };

  const SomeFunc = useCallback(() => {
    console.log(`어떤 함수 : ${number}`);
    return;
  }, [number]);

  useEffect(() => {
    console.log('어떤 함수가 변경되었습니다.');
  }, [SomeFunc]);

  return (
    <div>
      <input type="number" value={number} onChange={(e: ChangeEvent<HTMLInputElement>) => setNumber(Number(e.target.value))} />
      <br />
      <button onClick={SomeFunc}>어떤 함수 부르기</button>
    </div>
  );
};

export default UseCallbackEx;
