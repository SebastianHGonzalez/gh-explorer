import { ListUsers, listUsersQuery } from "@/apis/github/users";
import { t } from "@/i18n/t";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { List } from "react-native-paper";
import { ErrorAlert } from "./common/ErrorAlert";
import { GithubUserListItem } from "./GithubUserListItem";
import { useTextStyle } from "./common/useTextStyle";

type Item = ListUsers[number];

export function GithubUserList() {
  const query = useInfiniteQuery(listUsersQuery());
  const users = useMemo(
    () => query.data?.pages?.flat() || [],
    [query.data?.pages]
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
      />
    </>
  );
}

function keyExtractor(item: Item) {
  return item.id.toString();
}

function renderItem(info: ListRenderItemInfo<Item>) {
  return <GithubUserListItem {...info} />;
}

function EmptyList() {
  const h4Style = useTextStyle('h4');
  return <List.Item title={t("GithubUserList.empty")} titleStyle={h4Style} />;
}
