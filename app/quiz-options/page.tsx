"use client";
import React from 'react';
import useQuizOptionsForm from '@/hooks/useQuizOptionsForm';
import Loader from '@/components/loader';
import Image from 'next/image';
import MultiSelect from '@/components/multiSelect';
import { categoryOptions, difficultyOptions } from '@/constants';

const QuizOptionsPage: React.FC = () => {
  const { formValues, isLoading, handleFormChange, handleFormSubmit } = useQuizOptionsForm();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleFormSubmit();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="relative py-3 sm:max-w-2xl my-auto sm:mx-auto text-left">
      <div className="relative bg-white mx-2 sm:mx-0 shadow rounded-3xl p-10">
        <div className="flex items-center space-x-5 mx-2">
          <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
            <Image alt="editIcon" src='/edit.svg' width={40} height={40} />
          </div>
          <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
            <h2 className="leading-relaxed text-xl">Customize Your Preferences</h2>
            <p className="text-sm text-gray-500 font-normal leading-relaxed">Enter Questions number, hardness level and category.</p>
          </div>
        </div>
        <div className="max-w-screen-md mx-auto">
          <form onSubmit={handleSubmit} className="divide-y divide-gray-200 rounded pt-6 pb-8 mb-4">
            <div className="w-full space-y-4">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2">
                  Questions: <span className='font-semibold'>{formValues.numQuestions}</span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    name="numQuestions"
                    min="5"
                    max="50"
                    value={formValues.numQuestions}
                    onChange={(e) => handleFormChange({ numQuestions: parseInt(e.target.value) })}
                    className="appearance-none w-full h-6 px-1 rounded-full bg-gray-200 outline-none"
                    required
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>5</span>
                  <span>50</span>
                </div>
              </div>

              <div className="relative mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Difficulty
                </label>
                <select
                  name="difficulty"
                  value={formValues.difficulty}
                  onChange={(e) => handleFormChange({ difficulty: e.target.value })}
                  className="block w-full px-3 py-2 appearance-none border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                >
                  <option value="">Select difficulty</option>
                  {difficultyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.option}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute flex items-center right-0 top-[2.3rem] px-2 text-gray-700">
                  <Image
                    src="/arrowdown.svg"
                    alt="arrowIcon"
                    width={20}
                    height={20}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Categories
                </label>
                <MultiSelect
                  options={categoryOptions.map((option) => option.option)}
                  selectedOptions={formValues.categories}
                  onChange={(selected) => handleFormChange({ categories: selected })}
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-700 mt-8 mx-auto hover:bg-blue-800 flex items-center text-white font-bold py-4 px-12 rounded-2xl min-w-64 focus:outline-none focus:shadow-outline transition duration-300"
            >
              Start Quiz
              <Image src='/arrowwhite.svg' alt="arrowIcon" width={32} height={32} className="inline-block ml-16" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuizOptionsPage;
