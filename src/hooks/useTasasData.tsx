import { API_BASE_URL } from '../constants/global';

import { useEffect, useState } from 'react';

export const useTasasData = () => {
  const [tasasData, setTasasData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`${API_BASE_URL}/v1/tasas/bau`);
        const tasasData = await response.json();
        setTasasData(tasasData);
        setLoading(false);
      } catch (error) {}
    }
    getData();
  }, []);

  return { loading, tasasData };
};
