"use client";
import Loader from "@/components/loader";
import Questions from "@/components/questions";
import useFetchQuestions from "@/hooks/useFetchQuestions";
import { QuizOptions } from "@/types";
import { redirect } from "next/navigation";

const Options = (): QuizOptions | null => {
  let savedOptions = null;
  if (typeof window !== 'undefined')
    savedOptions = localStorage.getItem("quizOptions");
  return savedOptions ? JSON.parse(savedOptions) : null;
};

const QuizPage = () => {
  const options = Options();

  if (!options) {
    redirect("/quiz-options");
  }

  const { questions, loading, error } = useFetchQuestions(options);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white shadow-lg rounded-3xl px-7 py-5">
        <Questions questions={questions} limit={options.numQuestions} />
      </div>
    </div>
  );
};

export default QuizPage;
