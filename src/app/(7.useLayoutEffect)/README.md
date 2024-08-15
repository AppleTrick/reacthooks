useLayoutEffect와 useEffect는 거의 비슷한 역할을 한다.

```tsx
useEffect(() => {
  //...
}, [state]);
```

```tsx
useLayoutEffect(() => {
  //...
}, [state]);
```

구조도 비슷하고 기능도 비슷한데 다른점은 effect가 실행되는 시점이다.

- useEffect의 경우 화면이 업데이트된 이후에 effect가 실행된다.
- useLayoutEffect는 effect 실행 이후에 화면이 업데이트가 된다.

useLayoutEffect를 통해 생기는 이점은 effect를 먼저 실행하기 때문에 사용자가 보는 UI를 보다 정교하게 보일 수 있다.

# 코드로 알아보기

```tsx
'use client';

import { useEffect, useLayoutEffect, useState } from 'react';

const UseLayoutEffectEx = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('useEffect', count);
  }, [count]);

  useLayoutEffect(() => {
    console.log('useLayoutEffect', count);
  }, [count]);

  const handleCountUpdate = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <p>Count : {count}</p>
      <button onClick={handleCountUpdate}>카운트 UP</button>
    </div>
  );
};

export default UseLayoutEffectEx;
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/aef8ca7d-ca8c-4439-b139-8793bbf3dc29/58eb2136-fd9d-4c95-881b-da0829a3f955/Untitled.png)

코드는 useEffect가 먼저 존재하지만 결과로 보다시피 useLayoutEffect가 먼저 실행되는것을 볼 수 있다.

# useLayoutEffect와 useEffect의 차이

useEffect는 컴포넌트가 화면에 그려진 이후에 실행되고 useLayoutEffect는 화면이 그려지기 이전에 실행된다.

useEffect 의 Effect는 비동기 적으로 실행된다. 때문에 다른작업을 blocking 하지 않고 적절하게 실행된다.

useLayoutEffect는 동기적으로 실행된다. 때문에 다른작업을 blocking 하고, useLayoutEffect의 Effect가 실행되는 동안에 다른작업은 작동하지 않는다.

이 때문에 useLayoutEffect를 사용을 과하게 하거나 Effect 안에서 무거운 작업을 할 경우에는 App의 성능이 저하되기 때문에 주의가 필요하다.

# useLayoutEffect는 언제 사용하면 좋은가?

사용자의 정교한 UI 변화를 보여주기 위해 사용된다.

```tsx
'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// 외부 API 라 가정!
const getNumbers = () => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
};

const UseLayoutEffect1 = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const nums = getNumbers();
    setNumbers(nums);
  }, []);

  //   useEffect(() => {
  //     if (numbers.length === 0) {
  //       return;
  //     }
  //     if (ref.current) {
  //       for (let index = 0; index < 100000000; index++) {}

  //       ref.current.scrollTop = ref.current.scrollHeight;
  //     }
  //   }, [numbers]);

  useLayoutEffect(() => {
    if (numbers.length === 0) {
      return;
    }
    if (ref.current) {
      for (let index = 0; index < 100000000; index++) {}

      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [numbers]);

  return (
    <div>
      <div
        ref={ref}
        style={{
          height: '300px',
          border: '1px solid blue',
          overflow: 'scroll',
        }}
      >
        {numbers.map((num: number, index: number) => (
          <p key={index}>{num}</p>
        ))}
      </div>
    </div>
  );
};

export default UseLayoutEffect1;
```

## useEffect 코드를 사용할 경우

```tsx
useEffect(() => {
  if (numbers.length === 0) {
    return;
  }
  if (ref.current) {
    for (let index = 0; index < 100000000; index++) {}

    ref.current.scrollTop = ref.current.scrollHeight;
  }
}, [numbers]);
```

웹 브라우저의 CPU 성능을 저하 useEffect를 사용할 경우, 화면을 스크롤이 되지 않고 처음에 위에 값이 보이고 시간이 지난후에 스크롤이 된 결과가 나타난다.

위의 화면이 나타난이후

다음과 같은 화면이 나온다.

## useLayoutEffect 코드를 사용할 경우

```tsx
useLayoutEffect(() => {
  if (numbers.length === 0) {
    return;
  }
  if (ref.current) {
    for (let index = 0; index < 100000000; index++) {}

    ref.current.scrollTop = ref.current.scrollHeight;
  }
}, [numbers]);
```

바로 다음과 같은 화면이 나타난다.

UI 가 먼저 계산된 이후에 렌더링 되기 때문에 깜빡이거나 딜레이가 존재하지 않느다.

## 결론

UI의 변화를 정교하게 표현하기 위해서는 useLayoutEffect를 사용할것!

useLayoutEffect를 과하게사용하면 앱에 무리가 간다.

useLayoutEffect를 사용할지 useEffect를 사용할지 고민되면 useEffect를 사용하는게 더 좋은 판단일 경우가 많다.
