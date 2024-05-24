// pages/leaderboard.tsx
"use client";

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
      <div className="max-w-5xl mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
        <p>No leaderboard data available.</p>
        <button
          className="bg-blue-500 text-white py-2 mt-3 px-4 rounded"
          onClick={() => router.push("/quiz-options")}
        >
          Start Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="relative py-3 sm:max-w-screen-lg ml-6 sm:ml-8 text-left">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 shadow rounded-t-3xl py-10">
      <TopUser user={leaderboardData[0]} />
        {currentUser && <CurrentUserBest {...currentUser} />}
        
      </div>
      <div className="bg-white shadow rounded-3xl p-10 -mt-4">
        <OtherUsers users={leaderboardData.slice(1)} />
      </div>
    </div>
  );
};

export default LeaderboardPage;
