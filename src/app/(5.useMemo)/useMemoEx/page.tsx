'use client';

import { useMemo, useState } from 'react';

const hardCalculate = (Number: number) => {
  console.log('반복적이고 어려운 계산');
  for (let i = 0; i < 1234567; i++) {}
  return Number + 99999;
};

const easyCalculate = (Number: number) => {
  console.log('쉬운 계산');
  return Number + 1;
};

const MemoEx = () => {
  const [hardNumber, setHardNumber] = useState(1);
  const [easyNumber, setEasyNumber] = useState(1);

  // const hardSum = hardCalculate(hardNumber);
  const hardSum = useMemo(() => {
    return hardCalculate(hardNumber);
  }, [hardNumber]);
  const easySum = easyCalculate(easyNumber);

  return (
    <>
      <div>
        <h2> 복잡하고 어려운 계산</h2>
        <input type="number" value={hardNumber} onChange={(e) => setHardNumber(parseInt(e.target.value))} /> <span> + 99999 = {hardSum}</span>
      </div>
      <div>
        <h2> 간단하고 쉬운 계산</h2>
        <input type="number" value={easyNumber} onChange={(e) => setEasyNumber(parseInt(e.target.value))} /> <span> + 1 = {easySum}</span>
      </div>
    </>
  );
};

export default MemoEx;
