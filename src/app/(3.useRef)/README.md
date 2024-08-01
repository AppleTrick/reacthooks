# useRef 알아보기

useRef는 다음과 같이 사용된다.

```tsx
const ref = useRef(value);

// ref => { current. : value}
```

인자로 넣어준 값이 current에 존재하게된다.

```tsx
const ref = useRef('메가커피'); // ref => { current. : "메가커피"}

ref.current = '스타벅스'; // ref => { current. : "스타벅스"}
```

언제 어디서든 값이 변경이 가능하다.

제일 중요한것!

> ref 는 unmount 되기 전까지 컴포넌트 전생에 주기에 유지된다.

## useRef는 언제 사용하는가?

### 첫번째. 저장 공간의 용도

state는 값이 변경되면 리렌더링 되어 컴포넌트 내부 변수들이 초기화가 된다. 반면 ref는 값이 변해도 리렌더링 되지 않아 화면의 불필요한 리렌더링을 방지한다. 또한 state와 ref가 둘이 동시에 존재할때에도 ref의 값은 유지가 된다.

즉 변경시, 렌더링을 하지 말아야될 경우 사용된다.

## 두번째. DOM 요소를 제어

ref는 dom요소에 쉽게 접근시켜주는 역할을 한다.

# 실제 코드로 살펴보기

```tsx
'use client';

import { useRef, useState } from 'react';

const UseRef = () => {
  const [count, setCount] = useState(1);
  const countRef = useRef(0);

  console.log(countRef);
  console.log('렌더링...');

  const increaseCountState = () => {
    setCount(count + 1);
  };
  const increaseCountRef = () => {
    countRef.current = countRef.current + 1;
  };

  return (
    <div>
      <div>
        <p>count : {count}</p>
      </div>
      <div>
        <p>ref : {countRef.current}</p>
      </div>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={increaseCountState}>
          count 올리기
        </button>
      </div>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={increaseCountRef}>
          ref 올리기
        </button>
      </div>
    </div>
  );
};

export default UseRef;
```

자주 변하는 값을 State에 주면 화면을 리렌더링이 자주 일어나게한다. 이는 성능 저하를 유발하므로, 이럴 때는 Ref를 사용하여 해결하는 것이 좋다.

# Ref 와 let의 차이

```tsx
'use client';

import { useRef, useState } from 'react';

const UseRef = () => {
  const [renderer, setRenderer] = useState(0);
  const countRef = useRef(0);
  let countVar = 0;

  const increaseRef = () => {
    countRef.current = countRef.current + 1;
    console.log('ref', countRef.current);
  };

  const increaseVar = () => {
    countVar = countVar + 1;
    console.log('var', countVar);
  };

  const reRender = () => {
    setRenderer(renderer + 1);
  };

  return (
    <div>
      <div>
        <p>ref : {countRef.current}</p>
      </div>
      <div>
        <p>var : {countVar}</p>
      </div>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={increaseRef}>
          ref 올리기
        </button>
      </div>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={increaseVar}>
          var 올리기
        </button>
      </div>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={reRender}>
          리렌더링 시키기
        </button>
      </div>
    </div>
  );
};

export default UseRef;
```

ref가 let과 다른점은 let은 리렌더링이 될 경우 값이 초기화된다. 반면에 ref는 리렌더링 되더라도 값이 초기화 되지 않는다. ref는 컴포넌트 전 생애 주기에서 유지된다. mount 된시점에서 부터 unmount 되는 시점까지 쭉 이어진다.

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

const useRefEx = () => {
  const [count, setCount] = useState(1);
  //   const [renderCount, setRenderCount] = useState(1);

  //   useEffect(() => {
  //     console.log('렌더링!');
  //     setRenderCount(renderCount + 1);
  //   });

  // => 무한 루프를 유발함

  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
    console.log('렌더링 수', renderCount.current);
  });

  return (
    <div>
      <p>Count : {count}</p>
      <button onClick={() => setCount(count + 1)}> 값 올리기</button>
    </div>
  );
};

export default useRefEx;
```

위의 주석을 하면 무한 루프가 발생하게된다.

```tsx
const [renderCount, setRenderCount] = useState(1);

useEffect(() => {
  console.log('렌더링!');
  setRenderCount(renderCount + 1);
});

// => 무한 루프를 유발함
```

무한 루프가 발생하는 이유는

처음 렌더링 ⇒ useEffect 작동 ⇒ useEffect 안의 setState의 변화 ⇒ 리렌더링 ⇒ useEffect 작동 ⇒ useEffect 안의 setState의 변화 ⇒ 리렌더링 ⇒ ..

다음과 같이 무한으로 작동된다. 이런 경우에 useRef를 사용한다.

useRef는 리렌더링을 발생시키지 않기 때문에 state를 사용할때 처럼 무한 루프를 발생시키지 않는다.

useRef는 변화는 감지해야되지만 , 리렌더링을 시키지 않아야될때 사용되는 편리한 hook이다.

# useRef를 이용하여 DOM 요소 접근하는 방법

```tsx
'use client';

import { useEffect, useRef } from 'react';

const RefLogin = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // console.log(inputRef);
    inputRef.current?.focus();
  }, []);

  const login = () => {
    alert(`Welcome ${inputRef.current?.value}`);
    inputRef.current?.focus();
  };
  return (
    <div>
      <input className="text-black" ref={inputRef} type="text" placeholder="usename" />
      <button onClick={login} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        로그인
      </button>
    </div>
  );
};

export default RefLogin;
```

## 코드 분석

```tsx
<input className="text-black" ref={inputRef} type="text" placeholder="usename" />
```

ref = {inputRef} 를 통해 inputRef의 변수가 DOM 요소의 접근 할 수 있게 되었다.

useEffect 와 이를 함께 이용하여 사이트에 접속시에 input 창에 focus() 시키는 방법을 사용할 수 있다.

```tsx
useEffect(() => {
  // console.log(inputRef);
  inputRef.current?.focus();
}, []);
```
