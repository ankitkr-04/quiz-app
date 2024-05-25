// hooks/useLeaderboardData.ts
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LeaderboardData } from '@/types';

interface ApiResponse {
  leaderboard: LeaderboardData[];
  currentUser: LeaderboardData | null;
}

const useLeaderboardData = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[]>([]);
  const [currentUser, setCurrentUser] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        let user = JSON.parse('{}');
        if (typeof window !== 'undefined') {
          user = JSON.parse(localStorage.getItem('userInfo') || '{}');
        };
        const { data } = await axios.get<ApiResponse>('/api/leaderboard', {
          params: {
            email: user.email || '',
          },
        });

        setLeaderboardData(data.leaderboard);
        setCurrentUser(data.currentUser);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        setError('Failed to fetch leaderboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  return { leaderboardData, currentUser, loading, error };
};

export default useLeaderboardData;
