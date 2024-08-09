'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// 외부 API 라 가정!
const getNumbers = () => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
};

const UseLayoutEffect1 = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const nums = getNumbers();
    setNumbers(nums);
  }, []);

  //   useEffect(() => {
  //     if (numbers.length === 0) {
  //       return;
  //     }
  //     if (ref.current) {
  //       for (let index = 0; index < 100000000; index++) {}

  //       ref.current.scrollTop = ref.current.scrollHeight;
  //     }
  //   }, [numbers]);

  useLayoutEffect(() => {
    if (numbers.length === 0) {
      return;
    }
    if (ref.current) {
      for (let index = 0; index < 100000000; index++) {}

      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [numbers]);

  return (
    <div>
      <div
        ref={ref}
        style={{
          height: '300px',
          border: '1px solid blue',
          overflow: 'scroll',
        }}
      >
        {numbers.map((num: number, index: number) => (
          <p key={index}>{num}</p>
        ))}
      </div>
    </div>
  );
};

export default UseLayoutEffect1;
