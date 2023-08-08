import useSWR from 'swr';
import { Member } from '../lib/db/schema';
import fetcher from '../lib/fetcher';

const useMembers = () => {
    const { data, error, isLoading, mutate } = useSWR<Member[]>(
        '/api/members',
        fetcher
    );

    return {
        members: data,
        isLoading,
        isError: error,
        mutate,
    };
};

export default useMembers;
