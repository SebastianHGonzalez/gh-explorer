import { Screen } from "@/components/common/Screen";
import { GithubUserList } from "@/components/GithubUserList";
import { Route } from "@/utils/routes";
import { Link } from "expo-router";
import { Suspense } from "react";
import { Searchbar } from "react-native-paper";

export function ListGithubUsersScreen() {
  return (
    <Screen>
      <Link href={Route.SearchGithubUsers} asChild>
        <Searchbar value="" placeholder="Search" focusable={false} />
      </Link>

      <Suspense>
        <GithubUserList />
      </Suspense>
    </Screen>
  );
}
