`useDeferredValue`는 React 18에서 훅이다.

useDefferdValue는 복잡하거나 무거운 렌더링 작업에서 유용하게 사용할 수 있다.

`useDeferredValue`는 값을 지연시켜, 작업동안의 UI의 응답성을 유지할 수 있도록 돕는다.

# useDeferredValue의 개념

`useDeferredValue`는 값이 즉시 업데이트되지 않아도 될 때 사용된다.

예를 들어, 사용자가 텍스트를 입력할 때, 입력된 텍스트를 기반으로 검색 결과를 보여주는 컴포넌트가 있다고 가정했을때, 사용자가 빠르게 타이핑할 때마다 검색 결과를 업데이트하는 것은 불필요한 작업이 된다. 이러한 경우에 `useDeferredValue`를 사용하여 텍스트 입력에 딜레이를 주어 불필요한 렌더링을 방지한다.

# 코드로 알아보기

`ResultList.tsx`

```jsx
type ResultsListProps = {
  results: string[],
};

const ResultsList: React.FC<ResultsListProps> = ({ results }) => {
  if (results.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <ul>
      {results.map((result, index) => (
        <li key={index}>{result}</li>
      ))}
    </ul>
  );
};

export default ResultsList;
```

`performHeavyComputation` 함수 ( 함수 구분하기 위해 아래의 코드와 별도로 분리 시킴)

```jsx
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
```

`page.tsx`

```jsx
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
```

사용자가 텍스트를 입력할 때 `input` 값은 즉시 업데이트되지만, `deferredInput` 값은 렌더링이 필요한 시점에서만 업데이트 된다. 이럴 경우. 결과를 보여주는 `ResultsList` 컴포넌트가 불필요하게 자주 렌더링되지 않도록 방지할 수 있다.

# useDeferredValue를 사용하는 이유

**useDefferdValue**는 UI 업데이트가 사용자 인터랙션을 따라가지 못할 때, 즉시 렌더링하지 않고 딜레이를 주어 더 부드러운 사용자 경험을 제공하는 것이 큰 목표다. 또한 무겁거나 복잡한 작업에서 사용자 불편함을 느끼지 않고 사용할 수 있게 한다.

# useDeferredValue의 주의사항

**useDeferredValue**는 단순히 값을 지연시키는 것이므로, 모든 상황에 적합하지 않다. 또한 복잡한 상태 관리가 필요하거나 여러 상태 간의 의존성이 있는 경우, useDeferredValue를 사용하는 것 보다 다른 방법을 사용해보자.

# useDeferredValue와 useTransition의 차이점

`useTransition`은 비동기적으로 상태 전환을 관리하는 데 사용되고, `useDeferredValue`는 값 자체를 지연시키는 데 사용된다는 차이점이 있다.
`useTransition`은 입력이 바뀌었을 때 전체 상태 업데이트를 지연시키고, `isPending` 상태를 통해 로딩 스피너와 같은 UI 피드백을 제공할 수 있습니다. 반면, `useDeferredValue`는 값의 변화를 지연시킬 뿐, 추가적인 UI 상태 관리는 하지 않는다.
