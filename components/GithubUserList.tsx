import { ListUsers, listUsersQuery } from "@/apis/github/users";
import { t } from "@/i18n/t";
import { H1, H2, H4, SIZE, SURFACE } from "@/styles/constants";
import { Route, route } from "@/utils/routes";
import {
    useSuspenseInfiniteQuery
} from "@tanstack/react-query";
import { Link } from "expo-router";
import { useMemo } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { Avatar, List } from "react-native-paper";

type Item = ListUsers[number];

export function GithubUserList() {
  const query = useSuspenseInfiniteQuery(listUsersQuery());
  const users = useMemo(
    () => query.data?.pages.flat() || [],
    [query.data?.pages]
  );

  return (
    <FlatList
      data={users}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListEmptyComponent={EmptyList}
      ListHeaderComponent={ListHeader}
    />
  );
}

function keyExtractor(item: { id: number }) {
  return `${item.id}`;
}

function renderItem(props: ListRenderItemInfo<Item>) {
  return <ListItem {...props} />;
}

function ListItem({ item: { avatar_url, login } }: ListRenderItemInfo<Item>) {
  return (
    <Link href={route(Route.DescribeGithubUser, { login })} asChild>
      <List.Item
        title={login}
        titleStyle={H2}
        left={() => (
          <Avatar.Image size={SIZE.xxxl} source={{ uri: avatar_url }} />
        )}
        right={() => <List.Icon icon="chevron-right" />}
        style={SURFACE}
        titleNumberOfLines={1}
        accessibilityRole="link"
        accessibilityLabel={t("GithubUserList.accessibilityLabel", {
          username: login,
        })}
        accessibilityHint={t("GithubUserList.accessibilityHint")}
      />
    </Link>
  );
}

function EmptyList() {
  return <List.Item title={t("GithubUserList.empty")} titleStyle={H4} />;
}

function ListHeader() {
  return <List.Item title={t("GithubUserList.title")} titleStyle={H1} />;
}
