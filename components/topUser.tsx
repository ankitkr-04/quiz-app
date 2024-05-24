import React from 'react';
import Image from 'next/image';
import { LeaderboardData } from '@/types';
import { FaCrown } from 'react-icons/fa';

interface TopUserProps {
  user: LeaderboardData;
}

const TopUser: React.FC<TopUserProps> = ({ user }) => {
  const { name, score, avg } = user;

  const formattedAvg = avg.toFixed(2);

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-4">
      <div className="relative">
        <FaCrown className="text-yellow-400 text-3xl absolute -rotate-[40deg] -top-2" />
        <div className="absolute inset-0 p-2 border-4 border-yellow-400 rounded-full"></div>
        <Image
          src="/avatar.webp"
          alt={`${name}'s avatar`}
          width={100}
          height={100}
          className="rounded-full m-2"
        />
      </div>
      <h2 className="text-lg text-white text-center font-bold">{name}</h2>
      <div className="bg-yellow-400 text-yellow-700 font-bold rounded-full px-4 py-1">
        {score} points
      </div>
      <p className="text-white -mt-2 font-medium text-sm">{formattedAvg} Secs</p>
    </div>
  );
};

export default TopUser;
