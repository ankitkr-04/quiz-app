// pages/api/leaderboard.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/client";

const MAX_LEADERBOARD_ENTRIES = 25;

export async function GET(req: NextRequest) {
    try {
        const leaderboardData = await prisma.user.findMany({
            include: {
                quizResults: true,
            },
        });

        const filteredLeaderboard = leaderboardData
            .map(user => {
                const totalQuizResults = user.quizResults.length;
                const totalCorrect = user.quizResults.reduce((acc, curr) => acc + curr.correct, 0);
                const totalIncorrect = user.quizResults.reduce((acc, curr) => acc + curr.incorrect, 0);
                const totalAvgTime = user.quizResults.reduce((acc, curr) => acc + curr.avgTime, 0) / totalQuizResults;

                const score = totalCorrect - totalIncorrect / 2;

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    gender: user.gender,
                    score: score > 0 ? score : 0,
                    avgTime: totalAvgTime,
                    correctAnswers: totalCorrect,
                };
            })
            .filter(user => user.score > 0);

        filteredLeaderboard.sort((a, b) => {
            if (a.score !== b.score) return b.score - a.score;
            if (a.avgTime !== b.avgTime) return a.avgTime - b.avgTime;
            return b.correctAnswers - a.correctAnswers;
        });

        const rankedLeaderboard = filteredLeaderboard.map((entry, index) => ({
            id: entry.id,
            name: entry.name,
            email: entry.email,
            gender: entry.gender,
            score: entry.score,
            rank: index + 1,
            avg: entry.avgTime,
        }));

        const userEmail = req.headers.get('x-user-email') || null;
        const currentUser = userEmail ? rankedLeaderboard.find(entry => entry.email === userEmail) : null;

        return NextResponse.json({
            leaderboard: rankedLeaderboard.slice(0, MAX_LEADERBOARD_ENTRIES),
            currentUser,
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
