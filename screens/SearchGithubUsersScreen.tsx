import {
  SearchUsers, searchUsersQuery
} from "@/apis/github/search/users";
import { Screen } from "@/components/common/Screen";
import { GithubUserListItem } from "@/components/GithubUserListItem";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { useDebouncedValue } from "@tanstack/react-pacer/debouncer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { Searchbar } from "react-native-paper";

type Item = SearchUsers["items"][number];

export function SearchGithubUsersScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, { wait: 500 });
  const isEnabled = debouncedSearchQuery.length > 3;

  const search = useInfiniteQuery({
    ...searchUsersQuery({ q: debouncedSearchQuery, per_page: 10 }),
    enabled: isEnabled,
  });
  const total = search.data?.pages.at(-1)?.total_count;
  const suggestions = useMemo(
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
        value={searchQuery}
      />

      {isEnabled && (
        <FlashList
          data={suggestions}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          StickyHeaderComponent={() => <>count: {total}</>}
          stickyHeaderHiddenOnScroll
          keyboardShouldPersistTaps="handled"
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
