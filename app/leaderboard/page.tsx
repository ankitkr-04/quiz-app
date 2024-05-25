// pages/leaderboard.tsx
"use client";
// pages/leaderboard.tsx
import React from 'react';
import useLeaderboardData from '@/hooks/useLeaderboardData';
import Loader from '@/components/loader';
import TopUser from '@/components/topUser';
import CurrentUserBest from '@/components/currUserBest';
import OtherUsers from '@/components/otherUsers';
import { useRouter } from 'next/navigation';

const LeaderboardPage = () => {
  const { leaderboardData, currentUser, loading, error } = useLeaderboardData();
  const router = useRouter();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!leaderboardData || leaderboardData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
        <p className="mb-4">No leaderboard data available.</p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300"
          onClick={() => router.push("/quiz-options")}
        >
          Start Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl w-full mx-auto md:p-4">
     
      <div className="grid grid-cols-1">
        <div>
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 shadow rounded-lg p-6">
            <TopUser user={leaderboardData[0]} />
            {currentUser && <CurrentUserBest {...currentUser} />}
          </div>
        </div>
        <div>
          <div className="bg-white shadow -mt-4 pt-7 rounded-lg pb-3 px-6">
            <OtherUsers users={leaderboardData.slice(1)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
