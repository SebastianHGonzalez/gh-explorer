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
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Suspense, useCallback, useMemo, useRef, useState } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { Searchbar } from "react-native-paper";

type Item = SearchUsers["items"][number];

export function SearchGithubUsersScreen() {
  const [q, setSearchQuery] = useState("");

  const [debouncedQ] = useDebouncedValue(q, { wait: 500 });

  const onChangeSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const searchbarRef = useRef<TextInput>(null);
  useFocusEffect(() => {
    if (q.length > 0) return;
    setTimeout(() => {
      searchbarRef.current?.focus?.();
    }, 100);
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Screen>
        <Searchbar
          ref={searchbarRef}
          placeholder={t("SearchGithubUsersScreen.placeholder")}
          onChangeText={onChangeSearch}
          value={q}
          style={{ marginVertical: SIZE.md }}
        />

        {debouncedQ.length > 3 && (
          <Suspense>
            <ErrorBoundary renderFallback={renderErrorAlert}>
              <SearchResults q={debouncedQ} per_page={10} />
            </ErrorBoundary>
          </Suspense>
        )}
      </Screen>
    </TouchableWithoutFeedback>
  );
}

function SearchResults(props: SearchUsersInput) {
  const search = useSuspenseInfiniteQuery(searchUsersQuery(props));
  const results = useMemo(
    () => search.data?.pages.flatMap((page) => page.items) ?? [],
    [search.data?.pages],
  );

  return (
    <FlashList
      data={results}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onScroll={Keyboard.dismiss}
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
      estimatedItemSize={150}
    />
  );
}

function keyExtractor(item: Item) {
  return item.login.toString();
}

function renderItem(info: ListRenderItemInfo<Item>) {
  return <GithubUserListItem {...info} />;
}
