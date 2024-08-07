# useMemo 란?

useMemo는 컴포넌트를 최적화(optimization) 하는 리액트 훅이다.

컴포넌트 최적화의 훅은 useMemo 말고 useCallback 도 존재한다.

useMemo에서 Memo는 Memoization 을 의미한다

Memoization은 동일한 값을 리턴하는 함수를 반복적으로 호출하는 경우, 처음의 값을 메모리에 저장해서 함수를 호출할때 마다 메모리의 값을 불러오는 기법이다. 값을 캐싱해서 불러오는 것이라고 생각하면 된다.

## 함수형 컴포넌트가 렌더링 되는 과정에서 생기는 문제

함수형 컴포넌트는 렌더링 될때 마다 Component 함수를 호출하기 때문에 모든 변수를 초기화하는 과정을 겪는다.

```tsx
fuction calculate(){
	return 999
}
```

```tsx
function Component() {
  const value = calculate();

  return (
    <>
      <div> {value} </div>
    </>
  );
}
```

다음과 같은 경우가 존재하는 경우 props나 state가 변할때 마다 value의 값의 calculate() 함수를 계속적으로 호출하여 초기화 시킨다. 만약 calculate 함수가 무거운작업을 경우 한번 선언됬으면 헤결될 것이 반복적으로 호출되어 비효율적인 작업이 발생한다.

## 위와 같은 문제를 해결하기 위해 나온 useMemo()

```tsx
function Component() {
  const value = useMemo(() => calculate(), []);
  return (
    <>
      <div> {value} </div>
    </>
  );
}
```

useMemo는 Component가 처음에 mount 됬을때 값을 Memoization 시켜 값을 메모리에 저장한다.

이후 Component 가 리렌더링 됬을때 값을 메모리에서 불러온다

## useMemo의 구조

```tsx
const value = useMemo( () => { return value} , [item]}
```

첫번째 인자로 callback 함수를 받는데 이때 return 하는 값이 value의 값이 된다.

두번째 인자로 의존성 배열을 받는데, 이는 배열 안 값이 업데이트 될때만, Memoization 된 값을 새롭게 업데이트 하여 다시 Memoization 해둔다.

두번째 인자가 빈배열일 경우 mount 됬을때 한번만 실행되고 이후에는 항상 Memoization 된 값만 불러준다.

## useMemo를 사용 시 주의사항

useMemo는 무분별하게 남용하면 안된다.

useMemo는 메모리 값을 사용하기 때문에 불필요한 값까지 Memoization 을 하면 오히려 성능이 악화된다.

# 코드로 살펴보기

```tsx
'use client';

import { useState } from 'react';

const hardCalculate = (Number: number) => {
  console.log('반복적이고 어려운 계산');
  for (let i = 0; i < 1234567; i++) {}
  return Number + 99999;
};

const easyCalculate = (Number: number) => {
  console.log('쉬운 계산');
  return Number + 1;
};

const MemoEx = () => {
  const [hardNumber, setHardNumber] = useState(1);
  const [easyNumber, setEasyNumber] = useState(1);

  const hardSum = hardCalculate(hardNumber);
  const easySum = easyCalculate(easyNumber);

  return (
    <>
      <div>
        <h2> 복잡하고 어려운 계산</h2>
        <input type="number" value={hardNumber} onChange={(e) => setHardNumber(parseInt(e.target.value))} /> <span> + 99999 = {hardSum}</span>
      </div>
      <div>
        <h2> 간단한고 쉬운 계산</h2>
        <input type="number" value={easyNumber} onChange={(e) => setEasyNumber(parseInt(e.target.value))} /> <span> + 1 = {easySum}</span>
      </div>
    </>
  );
};

export default MemoEx;
```

다음과 같이 코드가 되어있을 경우

<img width="526" alt="1" src="https://github.com/user-attachments/assets/0f1e04a6-2045-4c89-90e7-eda027881411">

복잡하고 어려운 계산의 값을 변경해도 , 간단하고 쉬운계산의 값을 변경해도 `hardCalculate(hardNumber)` , `easyCalculate(easyNumber)`를 가 실행되게 된다.
본래의 의도라면 어려운 계산에서는 hardCalculate가 실행이 되고 쉬운 계산에서는 easyCalculate 만 실행이 됬어야하지만, 컴포넌트의 값을 초기화 하면서 불필요한 함수까지 재실행되는 현상이 발생하게 된다.

이를 해결하기 위해 useMemo를 사용한다.

```tsx
'use client';

import { useMemo, useState } from 'react';

const hardCalculate = (Number: number) => {
  console.log('반복적이고 어려운 계산');
  for (let i = 0; i < 1234567; i++) {}
  return Number + 99999;
};

const easyCalculate = (Number: number) => {
  console.log('쉬운 계산');
  return Number + 1;
};

const MemoEx = () => {
  const [hardNumber, setHardNumber] = useState(1);
  const [easyNumber, setEasyNumber] = useState(1);

  // const hardSum = hardCalculate(hardNumber);
  const hardSum = useMemo(() => {
    return hardCalculate(hardNumber);
  }, [hardNumber]);

  const easySum = easyCalculate(easyNumber);

  return (
    <>
      <div>
        <h2> 복잡하고 어려운 계산</h2>
        <input type="number" value={hardNumber} onChange={(e) => setHardNumber(parseInt(e.target.value))} /> <span> + 99999 = {hardSum}</span>
      </div>
      <div>
        <h2> 간단하고 쉬운 계산</h2>
        <input type="number" value={easyNumber} onChange={(e) => setEasyNumber(parseInt(e.target.value))} /> <span> + 1 = {easySum}</span>
      </div>
    </>
  );
};

export default MemoEx;
```

다음과 같이

```tsx
// const hardSum = hardCalculate(hardNumber);

const hardSum = useMemo(() => {
  return hardCalculate(hardNumber);
}, [hardNumber]);
```

를 변경하게 되면 간편하고 쉬운 계산의 값을 바꿔도 hardCalculate는 실행되지 않고 효율적으로 작동하게 된다.

# useMemo가 필요한 이유

```tsx
'use client';

import { useEffect, useState } from 'react';

const UseMemoNeed = () => {
  const [coffee, setCoffee] = useState(0);
  const [orderComplete, setOrderComplete] = useState(true);

  const receipt = {
    total: coffee * 2000,
  };

  useEffect(() => {
    console.log(receipt);
  }, [receipt]);

  return (
    <>
      <h1>UseMemo가 왜 필요한가?</h1>
      <input type="number" value={coffee} onChange={(e) => setCoffee(Number(e.target.value))} />
      <div>총 합계: {receipt.total} 원</div>
      <div>
        <button onClick={(e) => setOrderComplete(!orderComplete)}>테스트</button>
      </div>
    </>
  );
};

export default UseMemoNeed;
```

<img width="521" alt="2" src="https://github.com/user-attachments/assets/6edd007a-2e29-45d9-8c10-4142109f7966">

다음과 같은 코드가 존재한다.

receipt가 변경될때 마다 useEffect 에서 receipt 의 값을 콘솔로 출력해주는 코드이다.

문제는 화면에서 테스트 버튼 , (단순히 값을 true / false로 바꿔주는 버튼) 을 클릭해도 useEffect가 실행된다. 의존성 배열에 receipt를 넣었음에도 불구하고 이런 현상이 생기는 이유는 원시타입과 객체타입에서 생기는 문제이다.

원시타입은 메모리를 저장하면 그대로 가지고 있는 반면에 객체타입은 새로 할때 마다 메모리값이 변경되어 주소가 다르다

```tsx
const receipt = {
  total: coffee * 2000,
};
```

즉 다음과 같은 코드가 실행되었을때 값은 같을수 있더라도 메모리 주소가 다르기 때문에 useEffect가 작동하게 된다.

이를 해결하기 위해 useMemo를 필요하다.

```tsx
const receipt = useMemo(() => {
  return {
    total: coffee * 2000,
  };
}, [coffee]);
```

다음과 같이 코드를 작성하면 button을 눌러도 useEffect가 실행되지 않고 정상적으로 작동한다.
