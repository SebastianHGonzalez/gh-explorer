import { useGithubListUsers } from "@/hooks/useGithubListUsers";
import { FlatList, ListRenderItemInfo } from "react-native";
import { List } from "react-native-paper";

export function useGithubUserList() {
  const query = useGithubListUsers();

  return {
    users: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  }
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
    />
  );
}

function keyExtractor(item: { id: string }) {
  return item.id;
}

function renderItem({ item }: ListRenderItemInfo<Item>) {
  return (
    <List.Item
      title={item.login}
      left={() => <List.Icon icon="account" />}
      right={() => <List.Icon icon="chevron-right" />}
      onPress={() => {
        // Handle item press, e.g., navigate to user details
      }}
    />
  );
}
