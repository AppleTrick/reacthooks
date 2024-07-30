'use client';

import Timer from '@/app/components/timer';
import { useState } from 'react';

const CleanUp = () => {
  const [showTimer, setShowTimer] = useState(false);

  const handChangeShowTimer = () => {
    setShowTimer((prev) => !prev);
  };

  return (
    <div>
      {showTimer ? <Timer /> : <div>0</div>}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handChangeShowTimer}>
        Timer Toogle
      </button>
    </div>
  );
};

export default CleanUp;
