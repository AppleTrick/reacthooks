'use client';

import { ChangeEvent, useCallback, useState } from 'react';
import Box from './Box';

const UseCallbackEx1 = () => {
  const [size, setSize] = useState(100);
  const [isDark, setIsDark] = useState(false);

  const createBoxStyle = useCallback(() => {
    return {
      backgroundColor: 'yellow',
      width: `${size}px`,
      height: `${size}px`,
    };
  }, [size]);

  return (
    <div style={{ backgroundColor: isDark ? 'black' : 'white' }}>
      <input type="number" value={size} onChange={(e: ChangeEvent<HTMLInputElement>) => setSize(Number(e.target.value))} />
      <Box createBoxStyle={createBoxStyle} />
      <button onClick={() => setIsDark(!isDark)}>배경색 바꾸기</button>
    </div>
  );
};

export default UseCallbackEx1;
