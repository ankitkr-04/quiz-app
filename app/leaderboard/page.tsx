"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LeaderboardData } from '@/types';
import Image from 'next/image';
import Loader from '@/components/loader';
import UserIcon from '@/components/userIcon';

const LeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[] | null>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get('/api/leaderboard');
        setLeaderboardData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!leaderboardData || leaderboardData.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
        <p>No leaderboard data available.</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => console.log('Navigate to quiz page')}
        >
          Start Quiz
        </button>
      </div>
    );
  }

  const topThree = leaderboardData.slice(0, 3);
  const rest = leaderboardData.slice(3);

  return (
    <div className="relative py-3 sm:max-w-screen-lg ml-6 sm:ml-8 text-left">
      <div className="  bg-gradient-to-r from-blue-500  to-cyan-500 shadow rounded-t-3xl py-10">
        <h2 className="leading-relaxed text-4xl text-center text-white">Leaderboard</h2>
        <div className="flex justify-around gap-4 items-center mt-4">

          <div className="p-4 text-white text-center">
            <UserIcon user="A" badge={2} color='red' />
            <p className='font-semibold mt-2'>{topThree[1].name}</p>
            <p className='font-semibold'>{topThree[1].correctAnswers}</p>
        
            </div>
          <div className="p-4 bg-white mb-8"><UserIcon user="B" badge={1} color='blue' /></div>
          <div className="p-4 bg-white"><UserIcon user="C" badge={3} color='green' /></div>


        </div>
      </div>

      <div className=" bg-white  sm:mx-0 shadow rounded-3xl p-10 -mt-4">
        <h2 className="leading-relaxed text-4xl text-center">Leaderboard</h2>
      </div>
    </div>

  );
};

export default LeaderboardPage;
