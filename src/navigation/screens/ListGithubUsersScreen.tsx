import { Screen } from "@/components/common/Screen";
import { GithubUserList } from "@/components/GithubUserList";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Route } from "@/utils/routes";
import { Suspense } from "react";
import { Searchbar } from "react-native-paper";
import { ErrorAlert } from "@/components/common/ErrorAlert";
import { Link } from "@/components/common/Link";

export function ListGithubUsersScreen() {
  return (
    <Screen>
      <Link href={Route.SearchGithubUsers} asChild>
        <Searchbar value="" placeholder="Search" focusable={false} />
      </Link>

      <ErrorBoundary renderFallback={error => <ErrorAlert error={error} />}>
        <Suspense>
          <GithubUserList />
        </Suspense>
      </ErrorBoundary>
    </Screen>
  );
}
