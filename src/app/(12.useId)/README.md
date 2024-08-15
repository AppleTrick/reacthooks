# useId란?

useId 는 React18 에서 추가된 기능이다.

useId는 react의 고유한 Id를 만들때 사용하는 훅이다.

```tsx
const id = useId();
```

useId로 만든 Id는 form같은 요소에서 접근성 관련으로 사용한다.

# 코드로 알아보기

```tsx
'use client';

import { useId } from 'react';

const UseIdEx = () => {
  return (
    <div>
      <label htmlFor="name">이름</label>
      <input id="name" />
    </div>
  );
};

export default UseIdEx;
```

다음과 같은 코드에서 라벨에 있는 내용을 클릭하면 input값이 선택되는 코드이다.

## 문제가 되는 경우

```tsx
'use client';

import { useId } from 'react';

const UseIdEx = () => {
  const id = useId();
  console.log(id);

  return (
    <div>
      <MyName />
      <MyName />
    </div>
  );
};

export default UseIdEx;

const MyName = () => {
  return (
    <div>
      <label htmlFor="name">이름</label>
      <input id="name" />
    </div>
  );
};
```

다음과 같이 컴포넌트에 id값을 부여한 경우, 동일한 컴포넌트를 불러올때 동일한 id 값이 두개가 되어 정상적으로 작동하지 않는다.

이럴때 useId를 사용한다.

## useId를 통해 문제를 해결하는 방법

```tsx
'use client';

import { useId } from 'react';

const UseIdEx = () => {
  return (
    <div>
      <MyName />
      <MyName />
    </div>
  );
};

export default UseIdEx;

const MyName = () => {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>이름</label>
      <input id={id} />
    </div>
  );
};
```

useId를 사용하게 되면 input이 각각의 고유의 id를 생성하게 된다.

# useId를 효율적으로 사용하는 법

→ 컴포넌트의 label이 여러개일 경우

```tsx
'use client';

import { useId } from 'react';

const UseIdEx = () => {
  return (
    <div>
      <MyName />
      {/* <MyName /> */}
    </div>
  );
};

export default UseIdEx;

const MyName = () => {
  const id = useId();

  return (
    <div>
      <label htmlFor={`${id}-name`}>이름</label>
      <input id={`${id}-name`} />
      <br />
      <label htmlFor={`${id}-age`}>나이</label>
      <input id={`${id}-age`} />
    </div>
  );
};
```

다음과 같이 input 값이 여러개인 경우 Id를 부여할때 useId를 여러번을 사용하는게 아닌 `${id}-???` 과 같이 빽틱을 이용해서 값을 부여 하면 useId를 한번 사용하고도 input에 각각의 고유한 값을 부여할 수 있다.

# 다른 라이브러리들이 있음에도 useId를 사용하는 이유

리액트를 사용할 때 querySelector를 사용하는건 좋은방법이 아니다.

리액트에는 ref 라는 좋은 기능이 있기 때문이다.

```tsx
'use client';

import { useEffect, useId } from 'react';

const UseIdEx = () => {
  return (
    <div>
      <MyName />
    </div>
  );
};

export default UseIdEx;

const MyName = () => {
  const id = useId();

  useEffect(() => {
    const element = document.querySelector('#btn');
    console.log(element);
  }, []);

  return (
    <div>
      <button id="button">버튼</button>
      <label htmlFor={`${id}`}>이름</label>
      <input id={`${id}`} />
    </div>
  );
};
```

다음과 같이 id를 부여한다면 querySelector를 통해 button에 접근할 수 있지만

```tsx
const MyName = () => {
  const id = useId();

  useEffect(() => {
    // const element = document.querySelector('#btn');
    // console.log(element);

    const element = document.querySelector(id);
    console.log(element);
  }, []);

  return (
    <div>
      <button id="button">버튼</button>
      <label htmlFor={`${id}`}>이름</label>
      <input id={`${id}`} />
    </div>
  );
};
```

useId를 통해 querySelector로 간다면 아래와 같은 오류가 발생한다.

```tsx
SyntaxError: Failed to execute 'querySelector' on 'Document': ':R9uuucq:' is not a valid selector.
```

---

- 만약 다른 라이브러리를 사용할경우 페이지를 렌더링할 때마다 새롭게 고유한 id를 부여하는 번거로움 생기지만 useId는 그렇지 않고 고유한 값을 유지한다. ⇒ 안정성이 높아진다.
