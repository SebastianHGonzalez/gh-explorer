import { ListUsers } from "@/apis/github/users";
import { t } from "@/i18n/t";
import { SIZE } from "@/styles/constants";
import { Route, route } from "@/utils/routes";
import { ListRenderItemInfo } from "@shopify/flash-list";
import { Link } from "expo-router";
import { Avatar, List } from "react-native-paper";
import { useH2Style } from "./common/H2";
import { useContainerStyle } from "./common/Container";

type Item = ListUsers[number];

export function GithubUserListItem({ item: { avatar_url, login } }: ListRenderItemInfo<Item>) {
  const containerStyle = useContainerStyle(1);
  const h2Style = useH2Style();

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
