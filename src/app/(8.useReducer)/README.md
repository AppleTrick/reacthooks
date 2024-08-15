# useReducer 란?

useReducer는 useState와 동일하게 state값을 관리하는데 사용한다.

다만 useReducer는 여러개의 하위값을 포함하는 state를 관리할때 사용한다.

```tsx
{
  username: 'Wonyoung',
  email: 'wonyoung@example.com',
  hobbies: ['reading', 'traveling', 'coding'],
  friends: [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 }
  ],
  notifications: [
    { id: 1, message: 'Welcome to the platform!', read: false },
    { id: 2, message: 'Your profile is complete.', read: true }
  ]
};
```

## useReducer를 사용할때 알아야될 3가지

- Reducer
- Dispatch
- Action

각각의 역할을 다음과 같다.

⇒ Dispatch는 Reducer에 state의 값의 수정을 요청하는 역할을 한다.

⇒ Action은 Dispatch가 요청하는 값을 의미한다.

⇒ Reducer는 component의 State를 업데이트 시켜주는 역할을 한다.

전체적인 관점으로는 `Dispatch가  Action 이라는 값을 담아 Reducer에 요청한다.`

`Reducer는 이를 바탕으로 State를 수정한다.` 라고 보면 된다.

# 코드로 useReducer 알아보기

## useReducer의 구조

```tsx
const [state, dispatch] = useReducer(reducer, 'state의 초기값');
```

useReducer는 다음과 같은 구조를 가지고 있다.

해당코드로 state 값을 수정하고 싶으면 오직 reducer 를 통해서만 state의 값을 수정할 수 있다.

이때 state를 수정하는 reducer 를 호출하고 싶으면 dispatch를 통해서 reducer 함수를 호출할 수 있다.

```tsx
const reducer = (state, action) => {
  switch (action.type) {
    case 'deposit':
      return state + action.payload;
    case 'withdraw':
      return state - action.payload;
    default:
      return state;
  }
};
```

reducer 함수의 인자는 두가지 값을 갖는데 첫번째는 기존 reducer의 state값, 두번째로는 action의 값을 받는데 action에는 type과 payload를 갖게 된다.

```tsx
<button onClick={() => { dispatch({
	  type: 'deposit',
    payload: number,
   });
 }}>
```

위와 같이 button에는 dispatch의 인자로 객체를 받는데 객체의 값은 reducer 함수의 action값으로 전달된다.

객체의 주요한 값으론 첫번째가 type 이다. type에 따라 reducer가 다르게 동작할 수 있다 deposit 일경우 에는 state + action.payload 가 동작하게 되고 withdraw일 경우에는 state - action.payload 가 동작하게 된다.

두번째로는 payload 인데 이는 action 에서 전달해줄값을 포함하게 된다.

### 전체코드

```tsx
'use client';

import { useReducer, useState } from 'react';

// reducer  - state를 업데이트 시키는 역할
// dispatch - state 업데이트를 요구하는 역할
// action   - 요구사항

interface Action {
  type: 'deposit' | 'withdraw'; // 가능한 action type들을 정의
  payload: number; // payload는 number 타입
}

const reducer = (state: number, action: Action) => {
  console.log('reducer 가 일하는 중');
  switch (action.type) {
    case 'deposit':
      return state + action.payload;
    case 'withdraw':
      return state - action.payload;
    default:
      return state;
  }
};

const UseReducerEx = () => {
  const [number, setNumber] = useState(0);
  const [money, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      <h2>useReducer 사용예시</h2>
      <p> 잔고 : {money} 원</p>
      <input type="number" value={number} onChange={(e) => setNumber(Number(e.target.value))} step={1000} />
      <button
        onClick={() => {
          dispatch({
            type: 'deposit',
            payload: number,
          });
        }}
      >
        예금
      </button>
      <button
        onClick={() => {
          dispatch({
            type: 'withdraw',
            payload: number,
          });
        }}
      >
        출금
      </button>
    </div>
  );
};

export default UseReducerEx;
```
