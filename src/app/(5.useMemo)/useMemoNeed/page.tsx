'use client';

import { useEffect, useMemo, useState } from 'react';

const UseMemoNeed = () => {
  const [coffee, setCoffee] = useState(0);
  const [orderComplete, setOrderComplete] = useState(true);

  const receipt = useMemo(() => {
    return {
      total: coffee * 2000,
    };
  }, [coffee]);

  useEffect(() => {
    console.log(receipt);
  }, [receipt]);

  return (
    <>
      <h1>UseMemo가 왜 필요한가?</h1>
      <input type="number" value={coffee} onChange={(e) => setCoffee(Number(e.target.value))} />
      <div>총 합계: {receipt.total} 원</div>
      <div>
        <button onClick={(e) => setOrderComplete(!orderComplete)}>테스트</button>
      </div>
    </>
  );
};

export default UseMemoNeed;
