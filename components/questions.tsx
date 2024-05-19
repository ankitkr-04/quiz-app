import { useEffect, useState, useRef } from "react";
import { Question } from "@/types";
import QuestionCard from "./QCard";
import ProgressBar from "./progress";
import { useShuffle } from "@/lib/utils";
import { Button, Divider } from "antd";
import { useRouter } from "next/navigation";
import useInterval from "@/hooks/useInterval";

type Props = {
    questions: Question[];
    limit: number;
};

type QuizState = {
    curr: number;
    answers: string[];
    selected: string;
    progressValue: number;
    score: number;
    timeLeft: number;
    totalTime: number;
    questionStartTime: number;
};

const Questions = ({ questions, limit }: Props) => {
    const [quizState, setQuizState] = useState<QuizState>({
        curr: 0,
        answers: [],
        selected: "",
        progressValue: 0,
        score: 0,
        timeLeft: 15,
        totalTime: 0,
        questionStartTime: Date.now(),
    });
    const router = useRouter();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const shuffleAnswers = useShuffle(
        questions[quizState.curr]?.correctAnswer,
        questions[quizState.curr]?.incorrectAnswers
    );

    useEffect(() => {
        if (questions?.length >= 5) {
            setQuizState((prevState) => ({
                ...prevState,
                answers: shuffleAnswers(),
            }));
        }
        setQuizState((prevState) => ({
            ...prevState,
            progressValue: (100 / limit) * (quizState.curr + 1),
        }));
    }, [quizState.curr, questions, shuffleAnswers, limit]);

    useInterval(() => {
        setQuizState((prevState) => ({
            ...prevState,
            timeLeft: prevState.timeLeft > 0 && !prevState.selected ? prevState.timeLeft - 1 : prevState.timeLeft,
        }));
        
        if (quizState.timeLeft === 0) {
            showCorrectAnswer(); 
        }
    }, quizState.timeLeft > 0 && !quizState.selected ? 1000 : null);

    const handleShowResult = () => {
        const resultData = {
            totalQuestions: questions.length,
            correctAnswers: quizState.score,
            totalTime: quizState.totalTime,
        };
        sessionStorage.setItem('quizResult', JSON.stringify(resultData));
        router.push('/result');
    };
    

    const showCorrectAnswer = () => {
        setQuizState((prevState) => ({
            ...prevState,
            selected: questions[quizState.curr].correctAnswer,
        }));
        clearInterval(intervalRef.current as NodeJS.Timeout);
    };

    const handleCheck = (answer: string) => {
        setQuizState((prevState) => ({
            ...prevState,
            selected: answer,
        }));

        if (answer === questions[quizState.curr].correctAnswer) {
            setQuizState((prevState) => ({
                ...prevState,
                score: prevState.score + 1,
            }));
        }

        clearInterval(intervalRef.current as NodeJS.Timeout);
        const timeSpent = (Date.now() - quizState.questionStartTime) / 1000;
        setQuizState((prevState) => ({
            ...prevState,
            totalTime: prevState.totalTime + timeSpent,
        }));
    };

    const handleSelect = (i: string) => {
        if (quizState.selected === i && quizState.selected === questions[quizState.curr].correctAnswer) {
            return "correct";
        } else if (quizState.selected === i && quizState.selected !== questions[quizState.curr].correctAnswer) {
            return "incorrect";
        } else if (i === questions[quizState.curr].correctAnswer) {
            return "correct";
        }
    };

    const handleNext = () => {
        setQuizState((prevState) => ({
            ...prevState,
            curr: prevState.curr + 1,
            selected: "",
            timeLeft: 15,
            questionStartTime: Date.now(),
        }));
        clearInterval(intervalRef.current as NodeJS.Timeout);
    };

    const handleQuit = () => {
        router.push("/");
    };

    
    
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
