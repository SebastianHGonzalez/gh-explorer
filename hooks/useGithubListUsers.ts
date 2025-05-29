import { useQuery } from '@tanstack/react-query';

export function useGithubListUsers() {
    return useQuery({
        queryKey: ['github', 'users'],
        queryFn: async () => {
            const response = await fetch('https://api.github.com/users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
    });
}