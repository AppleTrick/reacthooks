# useTransition이란?

useTransition은 React 18에서 추가된 기능으로 사용자 인터페이스(UI)에서 느린 업데이트를 처리하는 데 사용되는 훅이다.

사용자가 어떤 작업을 수행했을 때, 이 작업이 완료되기 전까지 UI를 즉시 업데이트하는 대신, 이 작업을 '비동기'로 처리하고, 사용자에게 이 작업이 진행 중임을 알려주는 역할을 한다.

## useTranstion의 형태

```tsx
const [isPending, startTransition] = useTransition();
```

useTransition을 사용하면 UI의 응답성을 높이고, 느린 작업이 전체 UI를 블록하는 것을 방지할 수 있다.

# 코드로 알아보기

## 문제가 되는 코드

```tsx
'use client';

import { ChangeEvent, useState } from 'react';

const UseTransitionEx = () => {
  const [text, setText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input type="text" onChange={handleChange} />
      <p>{text}</p>
    </div>
  );
};

export default UseTransitionEx;
```

위의 코드처럼 `useTransition`을 사용하지 않고 `setText`를 직접 호출하게 되면, 입력이 매우 빠르게 이루어질 경우 UI가 순간적으로 느려질 수 있다.

만약 setText 말고도, 다른 복잡하거나 무거운 작업이 있을 경우 문제가 발생할 수 있다.

이런 문제가 발생할 때 useTransition을 사용하여 문제를 해결한다.

## useTransiton 사용할 경우

```tsx
'use client';

import { useState, useTransition } from 'react';

const UseTransitionEx = () => {
  const [text, setText] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    startTransition(() => {
      setText(e.target.value);
    });
  };

  return (
    <div>
      <input type="text" onChange={handleChange} />
      {isPending ? <p>로딩 중...</p> : <p>{text}</p>}
    </div>
  );
};

export default UseTransitionEx;
```

### 부분으로 살펴보기

```tsx
const [isPending, startTransition] = useTransition();
```

- **`isPending`:** 현재 트랜지션 상태가 진행 중인지를 나타내는 boolean 값이다.
  트랜지션이 시작되면 `isPending`은 `true`가 되고, 트랜지션이 완료되면 `false`로 변경된다.
- **`startTransition`**: 트랜지션을 시작하는 역할을 한다.. `startTransition` 안에 트랜지션으로 처리하고 싶은 상태 변경 작업을 포함하면, React는 이 작업을 낮은 우선순위로 처리한다.

```tsx
const handleChange = (e) => {
  startTransition(() => {
    setText(e.target.value);
  });
};
```

- `startTransition` 함수를 사용하여 `setText` 함수를 트랜지션으로 감싸서, 텍스트 입력에 대한 상태 변경이 발생할 때 React가 이 작업을 낮은 우선순위로 처리하게한다.

```tsx
{
  isPending ? <p>로딩 중...</p> : <p>{text}</p>;
}
```

- `isPending`이 `true`라면, 트랜지션이 진행 중임을 표시한다.

# 결론

`useTransition`을 사용함으로써 React는 이 작업을 낮은 우선순위로 처리하여 UI의 반응성을 유지하면서, 복잡하거나 무거운 작업이 동시에 발생하더라도 UI가 느려지는 문제를 완화한다.
