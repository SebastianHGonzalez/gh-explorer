import { renderErrorAlert } from "@/components/common/ErrorAlert";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Screen } from "@/components/common/Screen";
import { GithubUserList } from "@/components/GithubUserList";
import { Suspense } from "react";

export function ListGithubUsersScreen() {
  return (
    <Screen>
      <Suspense>
        <ErrorBoundary renderFallback={renderErrorAlert}>
          <GithubUserList />
        </ErrorBoundary>
      </Suspense>
    </Screen>
  );
}
