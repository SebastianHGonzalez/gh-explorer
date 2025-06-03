import { useListFavoriteUsers } from "@/hooks/gh-explorer/favorites/useListFavoriteUsers";
import { t } from "@/i18n/t";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { useMemo } from "react";
import { AppRefreshControl } from "./common/AppRefreshControl";
import { EmptyFavorites } from "./common/EmptyFavorites";
import { ErrorAlert } from "./common/ErrorAlert";
import { H1 } from "./common/H1";
import { GithubUserListItem } from "./GithubUserListItem";

type Item = { login: string };

export function FavoriteGithubUserList() {
  const query = useListFavoriteUsers();
  const users = useMemo(
    () => query.data?.pages?.flat() || [],
    [query.data?.pages],
  );

  return (
    <>
      {query.error && <ErrorAlert error={query.error} />}

      <FlashList
        data={users}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={EmptyList}
        estimatedItemSize={150}
        refreshControl={
          <AppRefreshControl
            refreshing={query.isRefetching}
            onRefresh={query.refetch}
          />
        }
      />
    </>
  );
}

function keyExtractor(item: Item) {
  return item.login.toString();
}

function renderItem(info: ListRenderItemInfo<Item>) {
  return <GithubUserListItem {...info} />;
}

function EmptyList() {
  return (
    <EmptyFavorites>
      <H1>{t("FavoriteGithubUserList.empty")}</H1>
    </EmptyFavorites>
  );
}
