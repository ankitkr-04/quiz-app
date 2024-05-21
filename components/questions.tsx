import { Button, Divider } from "antd";
import { QuizProps } from "@/types";
import QuestionCard from "./QCard";
import ProgressBar from "./progress";
import useQuestions from "@/hooks/useQuestions";
import '@/app/quiz.css';
import { FaClock } from "react-icons/fa";

const Questions = ({ questions, limit }: QuizProps) => {
    const {
        quizState,
        handleShowResult,
        handleCheck,
        handleSelect,
        handleNext,
        handleQuit,
    } = useQuestions({ questions, limit });

    return (
        <div className="">

            <ProgressBar progressValue={quizState.progressValue} />
            <div className="flex justify-between items-center py-5 px-2 font-bold text-md">
                <p className="font-semibold">Questions: {quizState.curr + 1} of {limit}</p>
                <div className="relative flex items-center">
                    <div className="bg-yellow-300 rounded-full flex gap-2 px-3 py-1 w-24 items-center justify-center shadow-md">
                        <FaClock className="text-yellow-700 text-xl" />
                        <p className=" text-black font-bold text-lg">{quizState.timeLeft}s</p>
                    </div>
                   
                </div>
            </div>
            <div className="flex flex-col py-10 px-3 md:px-5 gap-4 w-full">
                {questions.length > 0 && (
                    <>
                        <QuestionCard
                            question={questions[quizState.curr].question}
                            answers={quizState.answers}
                            selected={quizState.selected}
                            handleCheck={handleCheck}
                            handleSelect={handleSelect}
                        />
                        <button
                            className={`px-6 py-3 font-semibold rounded-full shadow-md transition-all duration-300 ${!quizState.selected && quizState.timeLeft !== 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white hover:from-blue-500 hover:to-cyan-500'
                                }`}
                            disabled={!quizState.selected && quizState.timeLeft !== 0}
                            onClick={() =>
                                questions.length === quizState.curr + 1 ? handleShowResult() : handleNext()
                            }
                        >
                            {questions.length - 1 !== quizState.curr ? "Next Question" : "Show Results"}
                        </button>
                        <button
                            className="px-6 py-3 font-semibold  rounded-full bg-red-500 text-white hover:bg-red-600 shadow-md transition-all duration-300"
                            onClick={handleQuit}
                        >
                            Quit Quiz
                        </button>
                    </>
                )}
            </div>
        </div>

    );
};

export default Questions;
