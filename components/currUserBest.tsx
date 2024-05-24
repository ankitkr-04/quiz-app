import React from 'react';
import { LeaderboardData } from '@/types';

const CurrentUserBest: React.FC<LeaderboardData> = ({ name, score, rank }) => {
  return (
    <div className="mt-6 bg-gradient-to-r from-yellow-200 to-yellow-400 px-6 py-4 rounded-3xl m-4 shadow-lg flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <p className="text-yellow-800 font-semibold text-3xl">#{rank}</p>
        <p className="text-yellow-900 text-lg font-medium">Greetings! {name}, You achieved {score} Points. Keep it Up</p>
      </div>
      <div className="flex justify-end items-center">
        <button className="bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-600 hover:to-yellow-800 text-white font-bold py-3 px-5 rounded-xl transition duration-300 transform hover:scale-105">
          Start Again
        </button>
      </div>
    </div>
  );
}

export default CurrentUserBest;