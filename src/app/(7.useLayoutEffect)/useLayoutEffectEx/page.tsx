'use client';

import { useEffect, useLayoutEffect, useState } from 'react';

const UseLayoutEffectEx = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('useEffect', count);
  }, [count]);

  useLayoutEffect(() => {
    console.log('useLayoutEffect', count);
  }, [count]);

  const handleCountUpdate = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <p>Count : {count}</p>
      <button onClick={handleCountUpdate}>카운트 UP</button>
    </div>
  );
};

export default UseLayoutEffectEx;
