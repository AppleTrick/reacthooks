# useEffect hook

# 서론

useEffect는 컴포넌트가 3가지 상태일때 동작된다.

- Mount : 화면에서 생성될때
- Upadate : 화면에서 업데이트 될때
- UnMount : 화면에서 사라질때

`useEffect(() ⇒ {})` useEffect는 기본적으로 인자로 callback 함수를 인자로 받는다.

## useEffect 의 형태

### 첫번째, useEffect의 인자로 callback 함수만 받는 경우

```tsx
useEffect(() => {
  // code.
});
```

해당경우는 component가 처음 렌더링될때 , 그리고 화면 다시 리렌더링 될 때 실행된다.

### 두번째, useEffect의 인자로 callback 함수와 배열을 받는 경우 (dependency array)

```tsx
useEffect(() => {
  // code.
}, [value]);
```

component가 처음 렌더링될때 , 그리고 dependency array안에 있는 value의 값이 바뀔때 실행된다.

### dependency array가 있지만 값이 없는 경우

```tsx
useEffect(() => {
  // code.
}, []);
```

해당 경우는 component가 렌더링 될때 한번만 실행된다.

### Clean up의 경우

```tsx
useEffect(() => {
  // code 작동

  return () => {
    // clean up 코드 실생
  };
}, []);
```

다음과 같이 useEffect 안에 return 을 넣은 경우는 clean up code로 Component가 UnMount 될때 실행된다. (ex : 타이머)

# 실제 코드로 살펴보기

```tsx
'use client';

import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';

const useEffect1 = () => {
  const [count, setCount] = useState(1);
  const [name, setName] = useState('');

  const handleCountUpdate = () => {
    setCount(count + 1);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // 렌더링 될때 마다 실행
  // mount + 렌더링 될 때 마다 실행
  useEffect(() => {
    console.log('렌더링 될때 마다 실행');
  });

  // count가 변할때만  실행
  // mount 될 때 , [ value ] 의 값이 변할 때 만 실행
  useEffect(() => {
    console.log('count 변화');
  }, [count]);

  // 처음에 mount 할 때만 실행
  useEffect(() => {
    console.log('mounting 때만 실행');
  }, [count]);

  return (
    <>
      <div>
        <span>count : {count}</span>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCountUpdate}>
        update
      </button>
      <div>
        <input type="text" value={name} onChange={handleInputChange} />
        <span> name : {name}</span>
      </div>
    </>
  );
};

export default useEffect1;
```

해당 코드에는 3개의 useEffect가 있는데 각각이 실행될때는 다음과 같다.

- mount 될때 , rerendering 될 때
- mount 될때 , count 의 값이 변할 때
- mount 될때만

## Clean Up 사용하는 방법

`timer.tsx`

```tsx
'use client';

import { useEffect, useState } from 'react';

const Timer = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('타이머 작동중');
      setTime((prev) => prev + 1);
    }, 1000);

    // clean up을 사용한 코드
    return () => {
      clearInterval(timer);
      console.log('타이머 종료');
    };
  }, []);

  return (
    <div>
      <div>{time}</div>
      <span>타이머를 시작합니다</span>
    </div>
  );
};

export default Timer;
```

`page.tsx`

```tsx
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
```

해당 코드는 button으로 timer를 활성화 시키는 코드이다.

만약 cleanup 코드가 없는경우 화면에 타이머가 없어도 , 내부의 `console.log('타이머 작동중')` 코드는 계속 작동 되는 일이 생긴다.

```tsx
return () => {
  clearInterval(timer);
  console.log('타이머 종료');
};
```

useEffect의 return으로 컴포넌트가 unmount 될때 올바른 방법으로 처리를 하자
