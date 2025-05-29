import { useGithubUserList, GithubUserList } from "@/components/GithubUserList";

export function ListGithubUsersScreen() {
  const githubUserList = useGithubUserList();

  return (
    <>
      <GithubUserList {...githubUserList} />
    </>
  );
}
