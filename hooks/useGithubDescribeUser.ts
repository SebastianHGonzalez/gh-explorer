import { useQuery } from "@tanstack/react-query";

interface UseGithubListUserProps {
  login: string;
}

export function useGithubDescribeUser({ login }: UseGithubListUserProps) {
  return useQuery({
    queryKey: ["github", "user", login],
    queryFn: async () => {
      const response = await fetch(`https://api.github.com/users/${login}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
}
