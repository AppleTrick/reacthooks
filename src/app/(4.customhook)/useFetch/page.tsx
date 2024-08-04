'use client';

import { useFetch } from '@/app/custom/useFetch';

// import { useEffect, useState } from 'react';

const baseUrl = 'https://jsonplaceholder.typicode.com';

const FetchCustomHook = () => {
  //   const [data, setData] = useState(null);

  //   const fetchUrl = (type: string) => {
  //     fetch(baseUrl + '/' + type)
  //       .then((res) => res.json())
  //       .then((res) => setData(res));
  //   };

  //   useEffect(() => {
  //     fetch('https://jsonplaceholder.typicode.com/users')
  //       .then((res) => res.json())
  //       .then((res) => console.log(res));
  //   }, []);

  //   useEffect(() => {
  //     fetchUrl('users');
  //   }, []);

  //   const { data, fetchUrl } = useFetch(baseUrl, 'users');
  const { data: userData } = useFetch(baseUrl, 'users');
  const { data: postData } = useFetch(baseUrl, 'posts');

  return (
    <div>
      <h1>useFetch</h1>
      {/* <button onClick={() => fetchUrl('users')}>users</button>
      <button onClick={() => fetchUrl('posts')}>posts</button>
      <button onClick={() => fetchUrl('todos')}>todos</button> */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <h2>Users</h2>
      {userData && <pre>{JSON.stringify(userData[0], null, 2)}</pre>}
      <h2>Posts</h2>
      {postData && <pre>{JSON.stringify(postData[0], null, 2)}</pre>}
    </div>
  );
};

export default FetchCustomHook;
