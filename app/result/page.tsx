"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/loader';
import Image from 'next/image';
import { ReloadOutlined, TrophyOutlined, ClockCircleOutlined } from '@ant-design/icons';
import useResultData from '@/hooks/useResultData';

const ResultPage = () => {
    const { resultData, user, loading } = useResultData();
    const router = useRouter();

    const handleButtonClick = (route: string) => {
        router.push(route);
    };

    if (loading) {
        return <Loader />;
    }

    if (!resultData) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
                    <h1 className="text-4xl font-bold mb-4">No Results Available</h1>
                    <p className="text-lg mb-6">Please complete the quiz to see results.</p>
                    <button
                        className="bg-blue-500 text-white px-6 py-3 rounded-md flex items-center justify-center w-full hover:bg-blue-600"
                        onClick={() => handleButtonClick('/quiz')}
                    >
                        <ReloadOutlined className="mr-2" />
                        Start Quiz
                    </button>
                </div>
            </div>
        );
    }

    const formattedTime = resultData.totalTime.toFixed(2);

    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="bg-white shadow-lg rounded-3xl p-8 sm:px-10 lg:px-12">
                <div className="flex items-center space-x-5">
                    <div className="h-14 w-14 bg-yellow-200 rounded-full flex justify-center items-center text-yellow-500">
                       <ClockCircleOutlined className="text-2xl" />
                    </div>
                    <div className="text-lg text-left font-semibold text-gray-700">
                        <h2 className="text-lg">Quiz Results</h2>
                        <p className="text-sm text-gray-500">Check your quiz performance below.</p>
                    </div>
                </div>
                <div className="mt-6 space-y-6 text-left">
                    <div className="flex justify-between space-x-4">
                        <div className="flex-1">
                            <p className="text-gray-600">Total Questions:</p>
                            <p className="text-2xl font-semibold">{resultData.totalQuestions}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-gray-600">Correct Answers:</p>
                            <p className="text-2xl font-semibold">{resultData.correct}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-gray-600">Total Time:</p>
                            <p className="text-2xl font-semibold">{formattedTime} seconds</p>
                        </div>
                    </div>
                    <div className="flex justify-center mt-6 space-x-4">
                        <button
                            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-12 rounded-2xl w-full sm:w-auto transition duration-300"
                            onClick={() => handleButtonClick('/leaderboard')}
                        >
                            <TrophyOutlined className="inline-block mr-2" />
                            Leaderboard
                        </button>
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-12 rounded-2xl w-full sm:w-auto transition duration-300"
                            onClick={() => handleButtonClick('/quiz')}
                        >
                            <ReloadOutlined className="inline-block mr-2" />
                            Start Again
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
