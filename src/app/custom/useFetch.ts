import { useEffect, useState } from 'react';

export const useFetch = (baseUrl: string, initialtype: string) => {
  const [data, setData] = useState(null);

  const fetchUrl = (type: string) => {
    fetch(baseUrl + '/' + type)
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  useEffect(() => {
    fetchUrl(initialtype);
  }, []);

  return {
    data,
    fetchUrl,
  };
};
