'use client';

import { useEffect, useRef } from 'react';

const RefLogin = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // console.log(inputRef);
    inputRef.current?.focus();
  }, []);

  const login = () => {
    alert(`Welcome ${inputRef.current?.value}`);
    inputRef.current?.focus();
  };
  return (
    <div>
      <input className="text-black" ref={inputRef} type="text" placeholder="usename" />
      <button onClick={login} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        로그인
      </button>
    </div>
  );
};

export default RefLogin;
