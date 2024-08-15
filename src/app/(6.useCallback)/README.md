# useCallback 이란?

useCallback 은 useMemo와 달리 값을 저장하는게 아닌 함수 그 자체를 memoization 해준다.

```tsx
const calculate = useCallback((num) => {return num + 1;} , [item]}
```

코드가 다음과 같다면 `num + 1` 의 내용의 함수를 메모리에 저장하여 필요할때 마다 가지고 와서 사용한다.

- Javascript 에서 함수는 사실 객체의 한 종류이다.

# useCallback 의 구조

```tsx
const calculate = useCallback( 함수 , 의존성 배열}
```

useCallback 은 위의 구조와 같은 형태를 가지고 있다.

여기서 함수는 메모리에 저장되는 함수로 `(num) => {return num + 1;}` 라는 함수가 메모리에 저장된다. 이후 의존성 배열의 값의 변경되지 않는 이상 그대로의 함수 값을 가지고 있다.

# 코드로 알아보기

```tsx
'use client';

import { ChangeEvent, useEffect, useState } from 'react';

const UseCallbackEx = () => {
  const [number, setNumber] = useState(0);

  const SomeFunc = () => {
    console.log(`어떤 함수 : ${number}`);
    return;
  };

  useEffect(() => {
    console.log('어떤 함수가 변경되었습니다.');
  }, [SomeFunc]);

  return (
    <div>
      <input type="number" value={number} onChange={(e: ChangeEvent<HTMLInputElement>) => setNumber(Number(e.target.value))} />
      <br />
      <button onClick={SomeFunc}>어떤 함수 부르기</button>
    </div>
  );
};

export default UseCallbackEx;
```

❗️다음 코드의 문제점을 알아보자

Javascript에서 함수는 하나의 객체를 가지고 있는것과 같다. 즉 SomeFunc 도 하나의 객체를 가지고 있다.

Javascript에서 변수에 객체를 할당 할 때는, 직접할당이 아닌 어떤 메모리에 할당하고 그 참조하는 값을 변수에 주기 때문에 즉 SomeFunc 에는 참조하는 주소값이 있다.

이 말은 React에서 컴포넌트가 다시 렌더링 되면서 함수는 객체이므로 다시 생성되어서 기존과 다른 메모리 주소값을 가지게 된다. 때문에 useEffect에서는 SomeFunc의 주소값이 변화 됬다는것으로 판단하여 useEffect 내부의 코드가 동작하게 된다.

이런 문제를 해결하기 위해 useCallaback을 사용한다.

```tsx
const SomeFunc = useCallback(() => {
  console.log(`어떤 함수 : ${number}`);
  return;
}, [number]);
```

# 코드로 알아보기2

`Box.tsx`

```tsx
import { useEffect, useState } from 'react';

interface CreateBoxStyleProps {
  backgroundColor: string;
  width: string;
  height: string;
}

interface BoxProps {
  createBoxStyle: () => CreateBoxStyleProps;
}

const Box = ({ createBoxStyle }: BoxProps) => {
  const [style, setStyle] = useState<CreateBoxStyleProps>({ backgroundColor: '', width: '', height: '' });

  useEffect(() => {
    console.log('박스 크기 변경하기');
    setStyle(createBoxStyle());
  }, [createBoxStyle]);

  return <div style={style}></div>;
};

export default Box;
```

`page.tsx`

```tsx
'use client';

import { ChangeEvent, useState } from 'react';
import Box from './Box';

const UseCallbackEx1 = () => {
  const [size, setSize] = useState(100);
  const [isDark, setIsDark] = useState(false);

  const createBoxStyle = () => {
    return {
      backgroundColor: 'yellow',
      width: `${size}px`,
      height: `${size}px`,
    };
  };

  return (
    <div style={{ backgroundColor: isDark ? 'black' : 'white' }}>
      <input type="number" value={size} onChange={(e: ChangeEvent<HTMLInputElement>) => setSize(Number(e.target.value))} />
      <Box createBoxStyle={createBoxStyle} />
      <button onClick={() => setIsDark(!isDark)}>배경색 바꾸기</button>
    </div>
  );
};

export default UseCallbackEx1;
```

코드가 다음과 같다면 정상적으로 동작은

input 값에 있는 size를 변경할때마다 console.log('박스 크기 변경하기'); 콘솔이 나와야 되지만

배경색 바꾸기 버튼을 클릭해도 console.log('박스 크기 변경하기'); 콘솔이 나온다.

이런 문제를 해결하기 위해 createBoxStyle에 useCallback을 사용하자!

```tsx
const createBoxStyle = useCallback(() => {
  return {
    backgroundColor: 'yellow',
    width: `${size}px`,
    height: `${size}px`,
  };
}, [size]);
```

다음과 같이 바꿔주게 되면 코드가 원래대로 정상적으로 작동하게 된다.
