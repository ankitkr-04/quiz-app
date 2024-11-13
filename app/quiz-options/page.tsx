"use client";
import Loader from "@/components/loader";
import MultiSelect from "@/components/multiSelect";
import { categoryOptions, difficultyOptions } from "@/constants";
import useQuizOptionsForm from "@/hooks/useQuizOptionsForm";
import Image from "next/image";
import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

const QuizOptionsPage: React.FC = () => {
  const { formValues, isLoading, handleFormChange, handleFormSubmit } =
    useQuizOptionsForm();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleFormSubmit();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full max-w-xl mx-auto z-20">
      <div className="bg-white shadow-lg rounded-3xl p-8 sm:px-10 lg:px-12">
        <div className="flex items-center space-x-5">
          <div className="h-14 w-14 bg-yellow-200 rounded-full flex justify-center items-center text-yellow-500">
            <Image alt="Edit Icon" src="/edit.svg" width={40} height={40} />
          </div>
          <div className="text-lg text-left font-semibold text-gray-700">
            <h2 className="text-lg">Customize Your Preferences</h2>
            <p className="text-sm text-gray-500">
              Enter the number of questions, difficulty level, and category.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="space-y-4 text-left font-semibold">
            <div className="flex flex-col">
              <label className="text-gray-600">
                Questions:{" "}
                <span className="font-semibold">{formValues.numQuestions}</span>
              </label>
              <div className="relative">
                <input
                  type="range"
                  name="numQuestions"
                  min="5"
                  max="50"
                  value={formValues.numQuestions}
                  onChange={(e) =>
                    handleFormChange({ numQuestions: parseInt(e.target.value) })
                  }
                  className="appearance-none w-full h-6 px-1 rounded-full bg-gray-200 outline-none"
                  required
                />
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>5</span>
                <span>50</span>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600">Difficulty</label>
              <div className="relative">
                <select
                  name="difficulty"
                  value={formValues.difficulty}
                  onChange={(e) =>
                    handleFormChange({ difficulty: e.target.value })
                  }
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
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <Image
                    src="/arrowdown.svg"
                    alt="Arrow Icon"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600">Categories</label>
              <MultiSelect
                options={categoryOptions.map((option) => option.option)}
                selectedOptions={formValues.categories}
                onChange={(selected) =>
                  handleFormChange({ categories: selected })
                }
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-12 rounded-2xl w-full sm:w-auto transition duration-300 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="flex items-center justify-center">
                  <BiLoaderCircle className="mr-3 text-2xl animate-spin" />
                  <p>Loading...</p>
                  </div>
                </>
              ) : (
                <>
                  Start Quiz
                  <Image
                    src="/arrowwhite.svg"
                    alt="Arrow Icon"
                    width={20}
                    height={20}
                    className="inline-block ml-2"
                  />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizOptionsPage;
