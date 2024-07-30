'use client';

import { useEffect, useState } from 'react';

const Timer = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('타이머 작동중');
      setTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      console.log('타이머 종료');
    };
  }, []);

  return (
    <div>
      <div>{time}</div>
      <span>타이머를 시작합니다</span>
    </div>
  );
};

export default Timer;
