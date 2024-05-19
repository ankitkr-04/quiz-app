// pages/api/result.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/client";

interface QuizResultRequestBody {
    userEmail: string;
    correct: number;
    incorrect: number;
    totalTime: number;
    totalQuestions: number;
}

const validateRequestBody = (body: QuizResultRequestBody): boolean => {
    return body.userEmail !== '' && body.correct >= 0 && body.incorrect >= 0 && body.totalTime > 0 && body.totalQuestions > 0;
};

const handleQuizResult = async (body: QuizResultRequestBody) => {
    const { userEmail, correct, incorrect, totalTime, totalQuestions } = body;

    const user = await prisma.user.findUnique({
        where: { email: userEmail },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const avgTime = totalTime / totalQuestions;

    const quizResult = await prisma.quizResult.create({
        data: {
            userId: user.id,
            correct,
            incorrect,
            avgTime,
        },
    });

    return quizResult;
};

export async function POST(req: NextRequest) {
    try {
        const body: QuizResultRequestBody = await req.json();

        // Validate the request body
        if (!validateRequestBody(body)) {
            return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
        }

        // Handle quiz result creation
        const quizResult = await handleQuizResult(body);
        return NextResponse.json(quizResult, { status: 200 });

    } catch (error) {
        console.error("Error handling quiz result:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
