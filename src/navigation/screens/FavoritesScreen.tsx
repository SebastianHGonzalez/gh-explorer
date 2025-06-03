import { ErrorAlert } from "@/components/common/ErrorAlert";
import { ErrorBoundary } from "react-error-boundary";
import { Screen } from "@/components/common/Screen";
import { FavoriteGithubUserList } from "@/components/FavoriteGithubUserList";
import { Suspense } from "react";

export function FavoritesScreen() {
  return (
      <Screen>
        <ErrorBoundary FallbackComponent={ErrorAlert} >
          <Suspense>
            <FavoriteGithubUserList />
          </Suspense>
        </ErrorBoundary>
      </Screen>
  );
}
