'use client'
import React, { useEffect, useState } from 'react';
import { BarChartOutlined, ReloadOutlined, TrophyOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Loader from '@/components/loader';
import { ResultData, UserDataProps } from '@/types';
import { Progress } from 'antd';
import Image from 'next/image';

const ResultPage = () => {
    const [resultData, setResultData] = useState<ResultData | null>(null);
    const [user, setUser] = useState<UserDataProps | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const data = sessionStorage.getItem('quizResult');
        const userInfo = localStorage.getItem('userInfo');

        if (data) setResultData(JSON.parse(data));
        if (userInfo) setUser(JSON.parse(userInfo));
        setLoading(false);
    }, [router]);

    if (loading) {
        return (
            <Loader />
        );
    }

    if (!resultData) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold mb-4">No Results Available</h1>
                    <p className="text-lg mb-6">Please complete the quiz to see results.</p>
                    <button
                        className="bg-blue-500 text-white px-6 py-3 rounded-md flex items-center hover:bg-blue-600"
                        onClick={() => router.push('/quiz')}
                    >
                        <ReloadOutlined className="mr-2" />
                        Start Quiz
                    </button>
                </div>
            </div>
        );
    }
    const percentage = (resultData.correct / resultData.totalQuestions) * 100;
    const formattedTime = resultData.totalTime.toFixed(2);

    return (
        <div className="relative py-3 sm:max-w-2xl my-auto sm:mx-auto text-left">
            <div className="relative bg-white mx-2 sm:mx-0 shadow rounded-3xl p-10">
                <div className="flex items-center space-x-5 mx-2 mb-4">
                    <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                        <h2 className="leading-relaxed tracking-wide text-4xl">Hi! {user?.name}</h2>
                        <p className="text-sm text-gray-500 font-normal leading-relaxed"></p>
                    </div>
                </div>
                <div className='bg-lightPurple px-3 py-8 rounded-lg flex flex-col justify-center space-x-4 gap-4 md:gap-12 items-center'>
                    <Image src='/clock.png' width={300} height={300} alt='clock' />
                    <h3 className="text-2xl px-3 text-center">
                        You took {formattedTime} seconds to correctly answer {resultData.correct} out of {resultData.totalQuestions} Questions.
                    </h3>
                    <div className='flex md:gap-12 space-x-4 mt-2'>
                        <div className='bg-white text-left px-6 py-4 rounded-lg'>
                            <p className='font-semibold text-4xl'>{resultData.totalQuestions}</p>
                            <p className='text-sm mt-1 tracking-wide'>Total Questions</p>
                        </div>
                        <div className='bg-darkPurple text-left px-6 py-4 text-white rounded-lg'>
                            <p className='font-semibold text-4xl'>{resultData.correct}</p>
                            <p className='text-sm mt-1 tracking-wide'>Correct Answers</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center space-x-4 mt-6">
                        <button
                            className="bg-blue-500 text-white px-6 py-3 rounded-md flex items-center hover:bg-blue-600"
                            onClick={() => router.push('/leaderboard')}
                        >
                            <TrophyOutlined className="mr-2" />
                            Leaderboard
                        </button>
                        <button
                            className="bg-green-500 text-white px-6 py-3 rounded-md flex items-center hover:bg-green-600"
                            onClick={() => router.push('/quiz')}
                        >
                            <ReloadOutlined className="mr-2" />
                            Start Again
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
