import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useCallback } from 'react'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
type UseShuffleHook = (correctAnswer: string, incorrectAnswers: string[]) => () => string[];

export const useShuffle: UseShuffleHook = (correctAnswer, incorrectAnswers) => {
  return useCallback(() => {
    const shuffledAnswers = [...incorrectAnswers];
    shuffledAnswers.sort(() => Math.random() - 0.5);
    const randomIndex = Math.floor(Math.random() * (shuffledAnswers.length + 1));
    shuffledAnswers.splice(randomIndex, 0, correctAnswer);
    return shuffledAnswers;
  }, [correctAnswer, incorrectAnswers]);
};