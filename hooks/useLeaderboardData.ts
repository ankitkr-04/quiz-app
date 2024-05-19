// hooks/useLeaderboardData.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { LeaderboardData } from '@/types';

const useLeaderboardData = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const { data, headers } = await axios.get('/api/leaderboard', {
          params: { page: pagination.current, pageSize: pagination.pageSize },
        });

        setLeaderboardData(data);
        setLoading(false);
        setPagination({
          ...pagination,
          total: parseInt(headers['x-total-count'] as string, 10),
        });
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboardData();
  }, [pagination]);

  return { leaderboardData, loading, pagination };
};

export default useLeaderboardData;