import { ListUsers, listUsersQuery } from "@/apis/github/users";
import { t } from "@/i18n/t";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { List } from "react-native-paper";
import { ErrorAlert } from "./common/ErrorAlert";
import { GithubUserListItem } from "./GithubUserListItem";
import { useTextStyle } from "./common/useTextStyle";

type Item = ListUsers[number];

export function GithubUserList() {
  const query = useSuspenseInfiniteQuery(listUsersQuery());
  const users = useMemo(
    () => query.data?.pages?.flat() || [],
    [query.data?.pages]
  );

  return (
    <>
      {query.error && <ErrorAlert error={query.error} />}

      <FlatList
        data={users}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={EmptyList}
        ListHeaderComponent={ListHeader}
      />
    </>
  );
}

function keyExtractor(item: Item) {
  return item.login;
}

function renderItem(info: ListRenderItemInfo<Item>) {
  return <GithubUserListItem {...info} />;
}

function EmptyList() {
  const h4Style = useTextStyle('h4');
  return <List.Item title={t("GithubUserList.empty")} titleStyle={h4Style} />;
}

function ListHeader() {
  const h1Style = useTextStyle('h1');
  return <List.Item title={t("GithubUserList.title")} titleStyle={h1Style} />;
}
