import { ListUsers, listUsersQuery } from "@/apis/github/users";
import { t } from "@/i18n/t";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { List } from "react-native-paper";
import { AppRefreshControl } from "./common/AppRefreshControl";
import { useTextStyle } from "./common/useTextStyle";
import { GithubUserListItem } from "./GithubUserListItem";
import { Image, View } from "react-native";
import { EmptyState } from "./common/EmptyState";
import { ErrorMessage } from "./common/ErrorMessage";
import { H1 } from "./common/H1";

type Item = ListUsers[number];

export function GithubUserList() {
  const query = useInfiniteQuery(listUsersQuery());
  const users = useMemo(
    () => query.data?.pages?.flat() || [],
    [query.data?.pages],
  );

  return (
    <FlashList
      data={users}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListEmptyComponent={
        query.isError ? (
          <ErrorMessage>
            <H1 style={{ maxWidth: 400, textAlign: 'center' }}>{query.error.message}</H1>
          </ErrorMessage>
        ) : (
          EmptyState
        )
      }
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
