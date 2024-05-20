import { Button, Divider } from "antd";
import { QuizProps } from "@/types";
import QuestionCard from "./QCard";
import ProgressBar from "./progress";
import useQuestions from "@/hooks/useQuestions";

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
        <div className="wrapper">
            <div className="bg-white p-4 shadow-md w-full md:w-[80%] lg:w-[70%] max-w-5xl rounded-md">
                <ProgressBar progressValue={quizState.progressValue} />
                <div className="flex justify-between py-5 px-2 font-bold text-md">
                    <p>Score: {quizState.score}</p>
                    <p>Time left: {quizState.timeLeft}s</p>
                </div>
                <div className="flex flex-col min-h-[70vh] py-10 px-3 md:px-5 gap-4 w-full">
                    {questions.length > 0 && (
                        <>
                            <QuestionCard
                                question={questions[quizState.curr].question}
                                answers={quizState.answers}
                                selected={quizState.selected}
                                handleCheck={handleCheck}
                                handleSelect={handleSelect}
                            />
                            <Divider />
                            <div className="flex mt-5 md:justify-between md:flex-row flex-col gap-4 md:gap-0 mx-auto max-w-xs w-full">
                                <Button
                                    disabled={!quizState.selected && quizState.timeLeft !== 0}
                                    onClick={() =>
                                        questions.length === quizState.curr + 1 ? handleShowResult() : handleNext()
                                    }
                                >
                                    {questions.length - 1 !== quizState.curr ? "Next Question" : "Show Results"}
                                </Button>
                                <Button danger onClick={handleQuit}>
                                    Quit Quiz
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Questions;
