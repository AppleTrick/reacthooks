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
