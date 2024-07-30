'use client';

import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';

const useEffect1 = () => {
  const [count, setCount] = useState(1);
  const [name, setName] = useState('');

  const handleCountUpdate = () => {
    setCount(count + 1);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // 렌더링 될때 마다 실행
  // mount + 렌더링 될 때 마다 실행
  useEffect(() => {
    console.log('렌더링 될때 마다 실행');
  });

  // count가 변할때만  실행
  // mount 될 때 , [ value ] 의 값이 변할 때 만 실행
  useEffect(() => {
    console.log('count 변화');
  }, [count]);

  // 처음에 mount 할 때만 실행
  useEffect(() => {
    console.log('mounting');
  }, [count]);

  return (
    <>
      <div>
        <span>count : {count}</span>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCountUpdate}>
        update
      </button>
      <div>
        <input type="text" value={name} onChange={handleInputChange} />
        <span> name : {name}</span>
      </div>
    </>
  );
};

export default useEffect1;
