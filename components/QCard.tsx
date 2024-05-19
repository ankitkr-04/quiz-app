import React from "react";
import { Button } from "antd";
import { QuestionCardProps } from "@/types";

const QuestionCard: React.FC<QuestionCardProps> = ({ question, answers, selected, handleCheck, handleSelect }) => {
    return (
        <>
            <h2 className="text-2xl text-center font-medium">{question.text}</h2>
            {answers.map((answer, i) => (
                <Button
                    key={i}
                    className={`option ${selected && handleSelect(answer)}`}
                    disabled={!!selected}
                    onClick={() => handleCheck(answer)}
                    style={{
                        backgroundColor:
                            selected && handleSelect(answer) === "correct"
                                ? "green"
                                : selected && handleSelect(answer) === "incorrect"
                                ? "red"
                                : undefined,
                        color: selected ? "white" : undefined,
                    }}
                >
                    {String.fromCharCode(65 + i)}. {answer}
                </Button>
            ))}
        </>
    );
};

export default QuestionCard;
