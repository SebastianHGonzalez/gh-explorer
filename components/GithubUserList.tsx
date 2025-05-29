import { useGithubDescribeUser } from "@/hooks/useGithubDescribeUser";
import { useGithubListUsers } from "@/hooks/useGithubListUsers";
import { t } from "@/i18n/t";
import { H1, H2, H4, SURFACE } from "@/styles/constants";
import { Link } from "expo-router";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import { Avatar, List } from "react-native-paper";

export function useGithubUserList() {
  const query = useGithubListUsers();

  return {
    users: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}

interface Item {
  id: string;
  login: string;
  avatar_url: string;
}

type GithubUserListProps = ReturnType<typeof useGithubUserList>;

export function GithubUserList({ users }: GithubUserListProps) {
  return (
    <FlatList
      data={users}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListEmptyComponent={() => <List.Item title={t("GithubUserList.empty")} />}
      contentContainerStyle={{ padding: 16 }}
      ListHeaderComponent={() => (
        <List.Item
          title={t("GithubUserList.title")}
          titleStyle={H1}
        />
      )}
    />
  );
}

function keyExtractor(item: { id: string }) {
  return item.id;
}

function renderItem(props: ListRenderItemInfo<Item>) {
  return <ListItem {...props} />;
}

function ListItem({ item }: ListRenderItemInfo<Item>) {
    const query = useGithubDescribeUser({ login: item.login });

  return (
    <Link href={`/github/${item.login}`} asChild>
      <List.Item
        title={item.login}
        titleStyle={H2}
        left={() => (
          <Avatar.Image size={48} source={{ uri: item.avatar_url }} />
        )}
        right={() => <List.Icon icon="chevron-right" />}
        style={SURFACE}
        titleNumberOfLines={1}
        accessibilityRole="link"
        accessibilityLabel={t("GithubUserList.accessibilityLabel", {
          username: item.login,
        })}
        accessibilityHint={t("GithubUserList.accessibilityHint")}
      />
    </Link>
  );
}
