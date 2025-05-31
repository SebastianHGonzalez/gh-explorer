import {
  SearchUsers, searchUsersQuery
} from "@/apis/github/search/users";
import { ErrorAlert } from "@/components/common/ErrorAlert";
import { Screen } from "@/components/common/Screen";
import { GithubUserListItem } from "@/components/GithubUserListItem";
import { useDebouncedValue } from "@tanstack/react-pacer/debouncer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { Searchbar } from "react-native-paper";

type Item = SearchUsers["items"][number];

export function SearchGithubUsersScreen() {
  const [q, setSearchQuery] = useState("");

  const [debouncedQ] = useDebouncedValue(q, { wait: 500 });
  const isEnabled = debouncedQ.length > 3;

  const search = useInfiniteQuery({
    ...searchUsersQuery({ q: debouncedQ, per_page: 10 }),
    enabled: isEnabled,
  });

  const results = useMemo(
    () => search.data?.pages.flatMap((page) => page.items) ?? [],
    [search.data?.pages]
  );

  const onChangeSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <Screen>
      <Searchbar
        autoFocus
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={q}
      />
      {search.error && <ErrorAlert error={search.error} />}

      {isEnabled && (
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          // StickyHeaderComponent={() => <>count: {total}</>}
          stickyHeaderHiddenOnScroll
        />
      )}
    </Screen>
  );
}

function keyExtractor(item: Item) {
  return item.login;
}

function renderItem(info: ListRenderItemInfo<Item>) {
  return <GithubUserListItem {...info} />;
}
