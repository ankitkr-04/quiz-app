import { ResultData, UserDataProps } from '@/types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const useResultData = () => {
    const [resultData, setResultData] = useState<ResultData | null>(null);
    const [user, setUser] = useState<UserDataProps | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const data = sessionStorage.getItem('quizResult');
            const userInfo = localStorage.getItem('userInfo');

            if (data) setResultData(JSON.parse(data));
            if (userInfo) setUser(JSON.parse(userInfo));
            setLoading(false);
        };

        fetchData();
    }, [router]);
    
    return { resultData, user, loading };
};
export default useResultData;
