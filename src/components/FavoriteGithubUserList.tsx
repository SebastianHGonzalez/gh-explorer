import { useListFavoriteUsers } from "@/hooks/gh-explorer/favorites/useListFavoriteUsers";
import { t } from "@/i18n/t";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { useMemo } from "react";
import { List } from "react-native-paper";
import { AppRefreshControl } from "./common/AppRefreshControl";
import { ErrorAlert } from "./common/ErrorAlert";
import { useTextStyle } from "./common/useTextStyle";
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
        estimatedItemSize={200}
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
  const h4Style = useTextStyle("h4");
  return (
    <List.Item title={t("FavoriteGithubUserList.empty")} titleStyle={h4Style} />
  );
}
