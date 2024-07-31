# useState란?

component가 상태 가지게 할 수 있다.

아래와 같은 코드 형태으로 존재한다.

```tsx
const [state, setState] = useState(초기값);
```

예시 코드로 보기

```tsx
const [time, setTime] = useState(12);

// time = 12
// setTime(10) 을 할 경우 time 의 값이 10으로 변경된다,
```

React는 setState() 요소를 사용하면 화면을 업데이트 즉 다시 렌더링 시켜준다

# 실제 코드로 살펴 보기

```tsx
'use client';

import { useState } from 'react';

const Mytime = () => {
  const [time, setTime] = useState(1);

  const handleClick = () => {
    let newTime;
    if (time >= 12) {
      newTime = 1;
    } else {
      newTime = time + 1;
    }

    setTime(newTime);
  };

  return (
    <div>
      <span>현재 시간 : {time} 시</span>
      <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Update
      </button>
    </div>
  );
};

export default Mytime;
```

`const [time, setTime] = useState(1);` 로 값을 선언하고

함수에서 setTime을 통해 값을 변경하는 식이다.

## prevState 알아보기

```tsx
'use client';

import { ChangeEvent, useState } from 'react';

const Upload = () => {
  const [names, setNames] = useState(['메가커피', '스타벅스']);
  const [input, setInput] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleUploadNames = () => {
    setNames((prevState) => {
      console.log(prevState);
      return [input, ...prevState];
    });
  };
  return (
    <div>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={handleUploadNames} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Upload
      </button>
      {names.map((e, i) => {
        return <p key={i}>{e}</p>;
      })}
    </div>
  );
};

export default Upload;
```

```tsx
const handleUploadNames = () => {
  setNames((prevState) => {
    console.log(prevState);
    return [input, ...prevState];
  });
};
```

handleUploadNames 의 함수에서 setNames는 값을 단순히 입력하는게 아니라 콜백을 통해 값을 넣어주는 형식이다. 여기서 prevState는 state의 이전값을 가지고 있다.

다음과 같이 하는 이유는 무거운 작업일 경우 바로 값이 바뀌지 않는경우가 생기고, 또한 무거운 작업일 경우 자주함을써 성능의 저하를 유발한다.

또한 리액트의 경우 불변성을 유지 시켜줘야 되는데, 직접 배열을 수정하는 대신, 새로운 배열을 생성하여 상태를 업데이트하는 것이 좋은 방법이다. 이를 위해 prevState를 이용하여 안전하게 수정이 가능하다.

# useState 초기값 선언 Tip

```tsx
const heavyWorks = () => {
  // 매우 오래 걸리는 일
};

const [state, setState] = useState(() => {
  return heavyWorks();
});
```

useState를 사용해서 초기값을 받아올때 어떤 무거운 작업을 통해 받는다면 callback 함수를 통해 받아오는게 좋다.
