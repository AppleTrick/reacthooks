'use client';

import { useRef, useState } from 'react';

const UseRef = () => {
  const [renderer, setRenderer] = useState(0);
  const countRef = useRef(0);
  let countVar = 0;

  const increaseRef = () => {
    countRef.current = countRef.current + 1;
    console.log('ref', countRef.current);
  };

  const increaseVar = () => {
    countVar = countVar + 1;
    console.log('var', countVar);
  };

  const reRender = () => {
    setRenderer(renderer + 1);
  };

  return (
    <div>
      <div>
        <p>ref : {countRef.current}</p>
      </div>
      <div>
        <p>var : {countVar}</p>
      </div>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={increaseRef}>
          ref 올리기
        </button>
      </div>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={increaseVar}>
          var 올리기
        </button>
      </div>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={reRender}>
          리렌더링 시키기
        </button>
      </div>
    </div>
  );
};

export default UseRef;
