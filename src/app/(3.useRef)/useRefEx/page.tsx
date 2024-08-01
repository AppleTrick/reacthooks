'use client';

import { useEffect, useRef, useState } from 'react';

const useRefEx = () => {
  const [count, setCount] = useState(1);
  //   const [renderCount, setRenderCount] = useState(1);

  //   useEffect(() => {
  //     console.log('렌더링!');
  //     setRenderCount(renderCount + 1);
  //   });

  // => 무한 루프를 유발함

  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
    console.log('렌더링 수', renderCount.current);
  });

  return (
    <div>
      <p>Count : {count}</p>
      <button onClick={() => setCount(count + 1)}> 값 올리기</button>
    </div>
  );
};

export default useRefEx;
