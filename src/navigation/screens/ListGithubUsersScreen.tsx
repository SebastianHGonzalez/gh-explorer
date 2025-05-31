import { ErrorAlert } from "@/components/common/ErrorAlert";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Screen } from "@/components/common/Screen";
import { GithubUserList } from "@/components/GithubUserList";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { t } from "@/i18n/t";
import { RouteName } from "@/utils/routes";
import { Suspense } from "react";
import { Searchbar } from "react-native-paper";

export function ListGithubUsersScreen() {
  const navigate = useAppNavigate();

  return (
    <Screen>
      <Searchbar value="" placeholder={t('SearchGithubUsersScreen.placeholder')} focusable={false} onPress={() => navigate(RouteName.SearchGithubUsersScreen)} />

      <ErrorBoundary renderFallback={error => <ErrorAlert error={error} />}>
        <Suspense>
          <GithubUserList />
        </Suspense>
      </ErrorBoundary>
    </Screen>
  );
}
