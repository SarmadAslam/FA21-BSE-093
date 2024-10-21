
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo'
interface Product {
  id: number;
  category: string;
  name: string;
  inStock: boolean;
}

const useFetchProducts = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const networkState = await NetInfo.fetch();
      

      if (networkState.isConnected) {
        const response = await fetch('https://simple-grocery-store-api.online/products');
        const result = await response.json();
        setData(result);

        await AsyncStorage.setItem('products', JSON.stringify(result));
      } else {
        
        const cachedData = await AsyncStorage.getItem('products');
        if (cachedData) {
          setData(JSON.parse(cachedData));
        } else {
          throw new Error('No internet and no cached data available.');
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetchProducts;
