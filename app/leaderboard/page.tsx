// pages/leaderboard.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { Table, Spin } from 'antd';
import prisma from '@/lib/client';

interface LeaderboardData {
    name: string;
    email: string;
    gender: string;
    totalQuestions: number;
    correctAnswers: number;
    avgTime: number;
}

const LeaderboardPage = () => {
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 }); 
    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const skip = (pagination.current - 1) * pagination.pageSize;
                const data = await prisma.quizResult.findMany({
                    include: { user: true },
                    orderBy: { correct: 'desc', avgTime: 'asc' }, 
                    skip,
                    take: pagination.pageSize,
                });

                const formattedData  : LeaderboardData[] = data.map(item => ({
                    name: item.user.name,
                    email: item.user.email,
                    gender: item.user.gender,
                    totalQuestions: item.correct + item.incorrect,
                    correctAnswers: item.correct,
                    avgTime: Number(item.avgTime.toFixed(2)), // Adjust formatting as needed
                }));

                setLeaderboardData(formattedData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        };

        fetchLeaderboardData();
    }, [pagination]); 

    const handleTableChange = (pagination: any) => {
        setPagination(pagination);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Total Questions',
            dataIndex: 'totalQuestions',
            key: 'totalQuestions',
        },
        {
            title: 'Correct Answers',
            dataIndex: 'correctAnswers',
            key: 'correctAnswers',
        },
        {
            title: 'Average Time (seconds)',
            dataIndex: 'avgTime',
            key: 'avgTime',
        },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
            <Table
                dataSource={leaderboardData}
                columns={columns}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: leaderboardData.length, // Assuming we know total count for pagination
                    onChange: handleTableChange,
                }}
            />
        </div>
    );
};

export default LeaderboardPage;
