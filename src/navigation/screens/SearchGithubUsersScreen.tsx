import {
  SearchUsers,
  SearchUsersInput,
  searchUsersQuery,
} from "@/apis/github/search/users";
import { renderErrorAlert } from "@/components/common/ErrorAlert";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { H4 } from "@/components/common/H4";
import { Screen } from "@/components/common/Screen";
import { GithubUserListItem } from "@/components/GithubUserListItem";
import { t } from "@/i18n/t";
import { FONT_WEIGHT, SIZE } from "@/styles/constants";
import { useFocusEffect } from "@react-navigation/native";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { useDebouncedValue } from "@tanstack/react-pacer/debouncer";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  Suspense,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Text, TextInput } from "react-native";
import { Searchbar } from "react-native-paper";

type Item = SearchUsers["items"][number];

export function SearchGithubUsersScreen() {
  const [q, setSearchQuery] = useState("");

  const [debouncedQ] = useDebouncedValue(q, { wait: 500 });

  const onChangeSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const searchbarRef = useRef<TextInput>(null);
  useFocusEffect(
    useCallback(() => {
      // Focus the searchbar when the screen is focused
      setTimeout(() => {
        searchbarRef.current?.focus?.();
      }, 100);
    }, []),
  );

  return (
    <Screen>
      <Searchbar
        ref={searchbarRef}
        autoFocus
        placeholder={t("SearchGithubUsersScreen.placeholder")}
        onChangeText={onChangeSearch}
        value={q}
        style={{ marginVertical: SIZE.md }}
      />

      {debouncedQ.length > 3 && (
        <ErrorBoundary renderFallback={renderErrorAlert}>
          <Suspense>
            <SearchResults q={debouncedQ} per_page={10} />
          </Suspense>
        </ErrorBoundary>
      )}
    </Screen>
  );
}

function SearchResults(props: SearchUsersInput) {
  const search = useInfiniteQuery(searchUsersQuery(props));
  const results = useMemo(
    () => search.data?.pages.flatMap((page) => page.items) ?? [],
    [search.data?.pages],
  );

  return (
    <FlashList
      data={results}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={
        search.isSuccess ? (
          <H4 style={{ margin: SIZE.md }}>
            {t("SearchGithubUsersScreen.listHeader", {
              q: (
                <Text
                  style={{ fontStyle: "italic", fontWeight: FONT_WEIGHT.light }}
                >
                  {props.q}
                </Text>
              ),
              count: search.data?.pages.at(-1)?.total_count.toString() ?? "",
            })}
          </H4>
        ) : null
      }
      onEndReached={() => {
        search.fetchNextPage();
      }}
      estimatedItemSize={200}
    />
  );
}

function keyExtractor(item: Item) {
  return item.id.toString();
}

function renderItem(info: ListRenderItemInfo<Item>) {
  return <GithubUserListItem {...info} />;
}
