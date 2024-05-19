"use client";
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { QuizOptions, Question } from '../types';

const fetchQuestions = async (url: string, params: Record<string, any>) => {
  const response = await axios.get<Question[]>(url, { params });

  if (response.status === 200 && response.data) {
    return response.data;
  } else {
    throw new Error("Invalid API response");
  }
};

const useFetchQuestions = (quizOptions: QuizOptions) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestionsWithParams = useCallback(async () => {
    try {
      const url = "https://the-trivia-api.com/v2/questions";
      const categories = quizOptions.categories.length > 1 ? quizOptions.categories.join(",") : quizOptions.categories[0];
      const params = {
        categories: categories || "",
        limit: quizOptions.numQuestions || 10,
        difficulties: quizOptions.difficulty || "medium",
      };

      const questions = await fetchQuestions(url, params);
      setQuestions(questions);
      
      
    } catch (error) {
      setError("Error fetching questions");
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  }, [quizOptions.categories, quizOptions.numQuestions, quizOptions.difficulty]);

  useEffect(() => {
    fetchQuestionsWithParams();
  }, []);

  return { questions, loading, error };
};

export default useFetchQuestions;