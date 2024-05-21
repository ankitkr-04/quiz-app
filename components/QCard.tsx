import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { QuestionCardProps } from "@/types";


const QuestionCard: React.FC<QuestionCardProps> = ({ question, answers, selected, handleCheck, handleSelect }) => {
    return (
        <div className="question-card">
            <h2 className="text-xl text-center font-medium"><span>Q. </span>{question.text}</h2>
            <div className="answers-container">
                {answers.map((answer, i) => {
                    const isSelected = selected && handleSelect(answer);
                    const isCorrect = isSelected === "correct";
                    const isIncorrect = isSelected === "incorrect";

                    return (
                        <button
                            key={i}
                            className={`option ${isSelected ? (isCorrect ? "correct" : "incorrect") : ""}`}
                            disabled={!!selected}
                            onClick={() => handleCheck(answer)}
                            style={{
                                backgroundColor: isCorrect
                                    ? "lightgreen"
                                    : isIncorrect
                                    ? "lightcoral"
                                    : "white",
                                borderColor: isCorrect
                                    ? "green"
                                    : isIncorrect
                                    ? "red"
                                    : "gray",
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            {String.fromCharCode(65 + i)}. {answer}
                            {isCorrect && <FaCheck className="icon" style={{ marginLeft: "10px", color: "green" }} />}
                            {isIncorrect && <FaTimes className="icon" style={{ marginLeft: "10px", color: "red" }} />}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default QuestionCard;
