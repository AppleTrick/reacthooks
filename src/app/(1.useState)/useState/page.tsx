'use client';

import { useState } from 'react';

const Mytime = () => {
  const [time, setTime] = useState(1);

  const handleClick = () => {
    let newTime;
    if (time >= 12) {
      newTime = 1;
    } else {
      newTime = time + 1;
    }

    setTime(newTime);
  };

  return (
    <div>
      <span>현재 시간 : {time} 시</span>
      <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Update
      </button>
    </div>
  );
};

export default Mytime;
