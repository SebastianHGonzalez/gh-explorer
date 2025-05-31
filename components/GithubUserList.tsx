import { ListUsers, listUsersQuery } from "@/apis/github/users";
import { t } from "@/i18n/t";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { List } from "react-native-paper";
import { ErrorAlert } from "./common/ErrorAlert";
import { useH1Style } from "./common/H1";
import { useH4Style } from "./common/H4";
import { GithubUserListItem } from "./GithubUserListItem";

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
  const h4Style = useH4Style();
  return <List.Item title={t("GithubUserList.empty")} titleStyle={h4Style} />;
}

function ListHeader() {
  const h1Style = useH1Style();
  return <List.Item title={t("GithubUserList.title")} titleStyle={h1Style} />;
}
