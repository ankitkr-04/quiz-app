import React from 'react';
import UserIcon from '@/components/userIcon';
import { LeaderboardData } from '@/types';

interface OtherUsersProps {
  users: LeaderboardData[];
}

const OtherUsers: React.FC<OtherUsersProps> = ({ users }) => (
  <div className="space-y-4">
    {users.map((user, index) => (
      <div key={user.id} className="relative">
        {/* Blue gradient background with shadow */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between px-3">
            <div className='flex items-center'>
              <div className="bg-blue-100 shadow-lg text-gray-900 font-bold rounded-lg w-12 h-12 flex items-center justify-center">
                {user.rank}
              </div>
              <div className="ml-4">
                <p className="text-lg md:text-xl font-semibold text-white">{user.name}</p>
                <p className="text-sm text-gray-200"><span className='font-semibold'>{user.avg.toFixed(2)} Sec</span> Avg Time</p>
              </div>
            </div>

            <p className='font-bold bg-blue-300 shadow-xl px-3 py-2 text-blue-950 rounded-lg'>{user.score} Points</p>

          </div>
        </div>
      </div>
    ))}
  </div>
);

export default OtherUsers;
