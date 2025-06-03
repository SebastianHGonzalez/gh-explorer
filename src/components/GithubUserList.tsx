import { ListUsers, listUsersQuery } from "@/apis/github/users";
import { t } from "@/i18n/t";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { List } from "react-native-paper";
import { AppRefreshControl } from "./common/AppRefreshControl";
import { useTextStyle } from "./common/useTextStyle";
import { GithubUserListItem } from "./GithubUserListItem";

type Item = ListUsers[number];

export function GithubUserList() {
  const query = useSuspenseInfiniteQuery(listUsersQuery());
  const users = useMemo(
    () => query.data?.pages?.flat() || [],
    [query.data?.pages],
  );

  return (
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
  return <List.Item title={t("GithubUserList.empty")} titleStyle={h4Style} />;
}
