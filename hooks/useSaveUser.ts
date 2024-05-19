import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { message } from 'antd';

const useSaveUser = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const onFinish = useCallback(async (values: any) => {
    setLoading(true);
    try {
      await axios.post('/api/users', values);
      message.success('User information saved successfully!');
      
      localStorage.setItem('userInfo', JSON.stringify(values));
      
      setSuccessMessageVisible(true);
      router.push('/quiz-options');
    } catch (error) {
      console.error('Error:', error);
      message.error('There was an error saving the user information.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (successMessageVisible) {
      const timeoutId = setTimeout(() => {
        setSuccessMessageVisible(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [successMessageVisible]);

  return { onFinish, loading, successMessageVisible };
};

export default useSaveUser;
