import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { categoryOptions, difficultyOptions } from '@/constants/index';
import { QuizOptions } from '@/types';

const useQuizOptionsForm = () => {
  const router = useRouter();

  const [formValues, setFormValues] = useState<QuizOptions>({
    categories: [],
    numQuestions: 10,
    difficulty: 'easy',
  });

  const handleFormChange = (changedValues: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      ...changedValues,
    }));
  };

  const handleFormSubmit = async () => {
    localStorage.setItem('quizOptions', JSON.stringify(formValues));

    try {
      router.push('/quiz');
    } catch (error) {
      console.error('Error saving quiz options:', error);
      router.push('/quiz');
    }
  };

  return {
    formValues,
    handleFormChange,
    handleFormSubmit,
    categoryOptions,
    difficultyOptions,
  };
};

export default useQuizOptionsForm;
