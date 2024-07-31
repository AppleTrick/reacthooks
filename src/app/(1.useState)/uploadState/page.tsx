'use client';

import { ChangeEvent, useState } from 'react';

const Upload = () => {
  const [names, setNames] = useState(['메가커피', '스타벅스']);
  const [input, setInput] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleUploadNames = () => {
    setNames((prevState) => {
      console.log(prevState);
      return [input, ...prevState];
    });
  };
  return (
    <div>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={handleUploadNames} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Upload
      </button>
      {names.map((e, i) => {
        return <p key={i}>{e}</p>;
      })}
    </div>
  );
};

export default Upload;
