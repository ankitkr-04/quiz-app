// pages/leaderboard.tsx
"use client"
import { Table, Spin, Button } from 'antd';
import useLeaderboardData from '@/hooks/useLeaderboardData';
import useTablePagination from '@/hooks/usePagination';

const LeaderboardPage = () => {
    const { leaderboardData, loading, pagination } = useLeaderboardData();
    const { pagination: tablePagination, handleTableChange } = useTablePagination(pagination);
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

  const shouldShowPagination = pagination.total > pagination.pageSize;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (leaderboardData.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
        <p>No leaderboard data available.</p>
        <Button type="primary" onClick={() => console.log('Navigate to quiz page')}>
          Start Quiz
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
      <Table
        dataSource={leaderboardData}
        columns={columns}
        rowKey={leaderboardData => leaderboardData.id}
        // pagination={shouldShowPagination ? {
        //   current: pagination.current,
        //   pageSize: pagination.pageSize,
        //   total: pagination.total,
        //   onChange: handleTableChange,
        // } : false}
      />
    </div>
  );
};

export default LeaderboardPage;