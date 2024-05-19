import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuizOptions } from '@/types';

const useQuizOptionsForm = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<QuizOptions>({
    categories: [],
    numQuestions: 10,
    difficulty: 'easy',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFormChange = (changedValues: Partial<QuizOptions>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      ...changedValues,
    }));
  };

  const handleFormSubmit = async () => {
    setIsLoading(true);
    try {
      localStorage.setItem('quizOptions', JSON.stringify(formValues));
      router.push('/quiz'); // Redirect to /quiz after saving options
    } catch (error) {
      console.error('Failed to save quiz options:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formValues,
    isLoading,
    handleFormChange,
    handleFormSubmit,
  };
};

export default useQuizOptionsForm;
