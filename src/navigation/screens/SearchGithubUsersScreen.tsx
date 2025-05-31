import {
  SearchUsers, searchUsersQuery
} from "@/apis/github/search/users";
import { ErrorAlert } from "@/components/common/ErrorAlert";
import { H4 } from "@/components/common/H4";
import { Screen } from "@/components/common/Screen";
import { GithubUserListItem } from "@/components/GithubUserListItem";
import { t } from "@/i18n/t";
import { FONT_WEIGHT, SIZE } from "@/styles/constants";
import { useDebouncedValue } from "@tanstack/react-pacer/debouncer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { Text } from "react-native";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
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

      <FlashList
        data={results}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={search.isSuccess ? (
          <H4 style={{ margin: SIZE.md }}>
            {t('SearchGithubUsersScreen.listHeader', {
              q: <Text key="q" style={{ fontStyle: 'italic', fontWeight: FONT_WEIGHT.light }}>{debouncedQ}</Text>,
              count: search.data?.pages.at(-1)?.total_count.toString() ?? ''
            })}
          </H4>
        ) : null}
        onEndReached={() => { debugger; search.fetchNextPage() }}
      />
    </Screen>
  );
}

function keyExtractor(item: Item) {
  return item.id.toString();
}

function renderItem(info: ListRenderItemInfo<Item>) {
  return <GithubUserListItem {...info} />;
}
