import { renderErrorAlert } from "@/components/common/ErrorAlert";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Screen } from "@/components/common/Screen";
import { FavoriteGithubUserList } from "@/components/FavoriteGithubUserList";
import { Suspense } from "react";

export function FavoritesScreen() {
  return (
    <Screen>
      <Suspense>
        <ErrorBoundary renderFallback={renderErrorAlert}>
          <FavoriteGithubUserList />
        </ErrorBoundary>
      </Suspense>
    </Screen>
  );
}
