import { useState, useEffect, useRef, useCallback } from "react";
import { useShuffle } from "@/lib/utils";
import useInterval from "@/hooks/useInterval";
import axios from "axios";
import { useRouter } from "next/navigation";
import { QuizProps, QuizState } from "@/types";

const useQuestions = ({ questions, limit }: QuizProps) => {
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
        if (questions.length >= 5) {
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
        setQuizState((prevState) => {
            const newTimeLeft = prevState.timeLeft > 0 && !prevState.selected ? prevState.timeLeft - 1 : prevState.timeLeft;
            if (newTimeLeft === 0) {
                showCorrectAnswer();
            }
            return { ...prevState, timeLeft: newTimeLeft };
        });
    }, quizState.timeLeft > 0 && !quizState.selected ? 1000 : null);

    const handleShowResult = async () => {
        if (typeof window !== 'undefined') {
            try {
                const user = JSON.parse(localStorage.getItem('userInfo') || 'null');
                if (!user) {
                    console.error('User not found in localStorage');
                    return;
                }

                const quizResult = {
                    userEmail: user.email,
                    correct: quizState.score,
                    incorrect: questions.length - quizState.score,
                    totalTime: quizState.totalTime,
                    totalQuestions: questions.length
                };

                const response = await axios.post('/api/results', quizResult);
                console.log('Quiz result saved:', response.data);

                sessionStorage.setItem('quizResult', JSON.stringify(quizResult));
                router.push('/result');
            } catch (error) {
                console.error('Error saving quiz result:', error);
            }
        }
    };

    const showCorrectAnswer = useCallback(() => {
        setQuizState((prevState) => ({
            ...prevState,
            selected: questions[quizState.curr].correctAnswer,
        }));
        clearInterval(intervalRef.current as NodeJS.Timeout);
    }, [questions, quizState.curr]);

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

    return {
        quizState,
        handleShowResult,
        handleCheck,
        handleSelect,
        handleNext,
        handleQuit
    };
};

export default useQuestions;
