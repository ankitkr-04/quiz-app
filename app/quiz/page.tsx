'use client'
import Loader from "@/components/loader";
import Questions from "@/components/questions";
import useFetchQuestions from "@/hooks/useFetchQuestions";
import { QuizOptions } from "@/types";
import { redirect } from "next/navigation";

const Options = (): QuizOptions | null => {
    const savedOptions = localStorage.getItem("quizOptions");
    return savedOptions ? JSON.parse(savedOptions) : null;
};


const QuizPage = () => {
    const options = Options();
    
    if (!options) { redirect("/quiz-options"); };

    const { questions, loading, error } = useFetchQuestions(options);
    

    if (loading) return <Loader />;
    if (error) return <p>{error}</p>;
  
    return (
      <div>
        <h1>Quiz</h1>
        <Questions questions={questions} limit={options.numQuestions} />
      </div>
    );
}
export default QuizPage;