import { ListUsers } from "@/apis/github/users";
import { t } from "@/i18n/t";
import { SIZE } from "@/styles/constants";
import { Route, route } from "@/utils/routes";
import { Link } from "expo-router";
import { ListRenderItemInfo } from "react-native";
import { Avatar, List } from "react-native-paper";
import { useTextStyle } from "./common/useTextStyle";
import { useContainerStyle } from "./common/useContainerStyle";

type Item = ListUsers[number];

export function GithubUserListItem({ item: { avatar_url, login } }: ListRenderItemInfo<Item>) {
  const containerStyle = useContainerStyle();
  const h2Style = useTextStyle('h2');

  return (
    <Link href={route(Route.DescribeGithubUser, { login })} asChild>
      <List.Item
        title={login}
        titleStyle={h2Style}
        left={() => (
          <Avatar.Image size={SIZE.xxxl} source={{ uri: avatar_url }} />
        )}
        right={() => <List.Icon icon="chevron-right" />}
        style={containerStyle}
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
