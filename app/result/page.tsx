'use client'
import React, { useEffect, useState } from 'react';
import { Button, Spin, Result } from 'antd';
import { BarChartOutlined, ReloadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

interface ResultData {
    totalQuestions: number;
    correctAnswers: number;
    totalTime: number;
}

const ResultPage = () => {
    const [resultData, setResultData] = useState<ResultData | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const data = sessionStorage.getItem('quizResult');
        if (data) {
            setResultData(JSON.parse(data));
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (!resultData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">No Results Available</h1>
                    <p className="text-lg">Please complete the quiz to see results.</p>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-md flex items-center"
                        onClick={() => router.push('/quiz')}
                    >
                        <ReloadOutlined className="mr-2" />
                        Start Quiz
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-4">Quiz Results</h1>
                <p className="text-lg mb-2">Total Questions: {resultData.totalQuestions}</p>
                <p className="text-lg mb-2">Correct Answers: {resultData.correctAnswers}</p>
                <p className="text-lg mb-4">Total Time: {resultData.totalTime} seconds</p>
                <div className="flex justify-between">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
                        onClick={() => router.push('/leaderboard')}
                    >
                        <BarChartOutlined className="mr-2" />
                        Leaderboard
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-md flex items-center"
                        onClick={() => router.push('/quiz')}
                    >
                        <ReloadOutlined className="mr-2" />
                        Take Quiz Again
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
