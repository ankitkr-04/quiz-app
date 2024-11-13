import "@/app/quiz.css";
import useQuestions from "@/hooks/useQuestions";
import { QuizProps } from "@/types";
import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { FaClock } from "react-icons/fa";
import QuestionCard from "./QCard";
import ProgressBar from "./progress";

const Questions = ({ questions, limit }: QuizProps) => {
  const {
    quizState,
    handleShowResult,
    handleCheck,
    handleSelect,
    handleNext,
    handleQuit,
  } = useQuestions({ questions, limit });

  const [showResultsLoading, setShowResultsLoading] = useState(false);

  const handleShowResults = async () => {
    setShowResultsLoading(true);
    try {
      await handleShowResult();
    } finally {
      setShowResultsLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      <ProgressBar progressValue={quizState.progressValue} />
      <div className="flex justify-between items-center py-4 md:py-5 px-3 md:px-5 font-bold text-md">
        <p className="font-semibold">
          Question {quizState.curr + 1} of {limit}
        </p>
        <div className="flex items-center">
          <div className="bg-yellow-300 rounded-full flex gap-2 px-3 py-1 w-24 items-center justify-center shadow-md">
            <FaClock className="text-yellow-700 text-xl" />
            <p className="text-black font-bold text-lg">
              {quizState.timeLeft}s
            </p>
          </div>
        </div>
      </div>
      <div className="py-4 md:py-10 px-3 md:px-5">
        {questions.length > 0 && (
          <>
            <div className="pb-4">
              <QuestionCard
                question={questions[quizState.curr].question}
                answers={quizState.answers}
                selected={quizState.selected}
                handleCheck={handleCheck}
                handleSelect={handleSelect}
              />
            </div>
            <div className="flex flex-col gap-4 md:mx-24">
              <button
                className={`px-6 py-3 font-semibold rounded-full shadow-md transition-all duration-300 ${
                  !quizState.selected && quizState.timeLeft !== 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-400 to-cyan-400 text-white hover:from-blue-500 hover:to-cyan-500"
                }`}
                disabled={!quizState.selected && quizState.timeLeft !== 0}
                onClick={() =>
                  questions.length === quizState.curr + 1
                    ? handleShowResults()
                    : handleNext()
                }
              >
                {questions.length - 1 !== quizState.curr ? (
                  "Next Question"
                ) : showResultsLoading ? (
                  <>
                    <div className="flex items-center justify-center">
                      <BiLoaderCircle className="mr-3 text-2xl animate-spin" />
                      Loading...
                    </div>
                  </>
                ) : (
                  "Show Results"
                )}
              </button>
              <button
                className="px-6 py-3 font-semibold rounded-full bg-red-500 text-white hover:bg-red-600 shadow-md transition-all duration-300"
                onClick={handleQuit}
              >
                Quit Quiz
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Questions;
