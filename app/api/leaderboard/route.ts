// pages/api/leaderboard.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/client";
import { LeaderboardData } from "@/types";

// Handler function to fetch leaderboard data
export async function GET(req: NextRequest) {
    try {
        const leaderboardData = await prisma.user.findMany({
            include: {
                quizResults: true,
            },
        });

        const filteredLeaderboard = leaderboardData.filter(user => user.quizResults.length > 0);

        // Format the data as per LeaderboardData interface
        const formattedLeaderboard: LeaderboardData[] = filteredLeaderboard.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            gender: user.gender,
            totalQuestions: user.quizResults.reduce((acc, curr) => acc + curr.correct + curr.incorrect, 0),
            correctAnswers: user.quizResults.reduce((acc, curr) => acc + curr.correct, 0),
            avgTime: user.quizResults.reduce((acc, curr) => acc + curr.avgTime, 0) / user.quizResults.length,
        }));

        // Sort leaderboard by avgTime ascending and correctAnswers descending
        formattedLeaderboard.sort((a, b) => {
            // Sort by avgTime ascending
            if (a.avgTime !== b.avgTime) {
                return a.avgTime - b.avgTime;
            } else {
                // If avgTime is the same, sort by correctAnswers descending
                return b.correctAnswers - a.correctAnswers;
            }
        });

        return NextResponse.json(formattedLeaderboard, { status: 200 });
    } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
