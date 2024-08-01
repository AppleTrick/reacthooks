'use client';

import { useRef, useState } from 'react';

const UseRef = () => {
  const [count, setCount] = useState(1);
  const countRef = useRef(0);

  console.log(countRef);
  console.log('렌더링...');

  const increaseCountState = () => {
    setCount(count + 1);
  };
  const increaseCountRef = () => {
    countRef.current = countRef.current + 1;
    console.log('Ref', countRef.current);
  };

  return (
    <div>
      <div>
        <p>count : {count}</p>
      </div>
      <div>
        <p>ref : {countRef.current}</p>
      </div>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={increaseCountState}>
          count 올리기
        </button>
      </div>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={increaseCountRef}>
          ref 올리기
        </button>
      </div>
    </div>
  );
};

export default UseRef;
