'use client';

import { useDeferredValue, useEffect, useState } from 'react';
import ResultsList from './ResultsList';

const UseDefferdValue = () => {
  const [input, setInput] = useState('');
  const deferredInput = useDeferredValue(input);

  const [inputRenderCount, setInputRenderCount] = useState(0);
  const [deferredRenderCount, setDeferredRenderCount] = useState(0);

  useEffect(() => {
    setInputRenderCount((prev) => prev + 1);
  }, [input]);

  useEffect(() => {
    setDeferredRenderCount((prev) => prev + 1);
  }, [deferredInput]);

  const results = performHeavyComputation(deferredInput);

  return (
    <div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="검색어를 입력하세요" />
      <ResultsList results={results} />
      <div>
        <p>Input Value: {input}</p>
        <p>Deferred Input Value: {deferredInput}</p>
        <p>Input Render Count: {inputRenderCount}</p>
        <p>Deferred Render Count: {deferredRenderCount}</p>
      </div>
    </div>
  );
};

export default UseDefferdValue;

const performHeavyComputation = (query: string) => {
  // 가정: 아주 큰 데이터셋이 있다고 가정

  let result = '';
  for (let i = 0; i < 1000000; i++) {
    result = query.split('').reverse().join(''); // 단순한 무거운 작업
  }
  const largeDataset = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
    'Honeydew',
    'Kiwi',
    'Lemon',
    'Mango',
    'Nectarine',
    'Orange',
    'Papaya',
    'Quince',
    'Raspberry',
    'Strawberry',
    'Tangerine',
    'Ugli Fruit',
    'Vanilla',
    'Watermelon',
    'Xigua',
    'Yellow Passion Fruit',
    'Zucchini',
  ];

  return largeDataset.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
};
