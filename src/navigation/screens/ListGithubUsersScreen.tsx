import { ErrorAlert } from "@/components/common/ErrorAlert";
import { ErrorBoundary } from "react-error-boundary";
import { Screen } from "@/components/common/Screen";
import { GithubUserList } from "@/components/GithubUserList";
import { Suspense } from "react";

export function ListGithubUsersScreen() {
  return (
    <Screen>
      <ErrorBoundary FallbackComponent={ErrorAlert} >
        <Suspense>
          <GithubUserList />
        </Suspense>
      </ErrorBoundary>
    </Screen>
  );
}
