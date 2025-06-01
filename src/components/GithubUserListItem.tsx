import { describeUserQuery } from "@/apis/github/users/[login]";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { t } from "@/i18n/t";
import { SIZE } from "@/styles/constants";
import { AppRouteName } from "@/navigation/types";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ListRenderItemInfo } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet } from "react-native";
import { Avatar, List } from "react-native-paper";
import { H2 } from "./common/H2";
import { H3 } from "./common/H3";
import { P } from "./common/P";
import { SpaceBetween } from "./common/SpaceBetween";
import { useContainerStyle } from "./common/useContainerStyle";

type Item = {
  avatar_url: string,
  login: string,
};

export function GithubUserListItem({ item: { login, avatar_url }}: ListRenderItemInfo<Item>) {
  const query = useQuery({ ...describeUserQuery(login), })
  const {
    name,
    bio,
    company,
    email,
    followers,
    public_repos,
    twitter_username,
  } = query.data ?? {};

  const containerStyle = useContainerStyle();

  const navigate = useAppNavigate();

  return (
      <List.Item
      onPress={() => navigate(AppRouteName.GithubUserDescriptionScreen, { login })}
        title={<>
          <H2>{name || login}</H2>
          {name && login && <H3 style={{ fontStyle: 'italic', }}>{" - "}{name && login}</H3>}
        </>}
        description={<>
          <SpaceBetween direction="vertical">
            {bio && <P>
              {bio}
            </P>}

            {company && <P>
              {company}
            </P>}

            {email && <P>
              {email}
            </P>}

            <SpaceBetween>
              <P style={styles.badge}>
                <Ionicons size={SIZE.lg} name="person" />{followers}
              </P>
              <P style={styles.badge}>
                <Ionicons size={SIZE.lg} name="book-sharp" />{public_repos}
              </P>
              {twitter_username && <P style={styles.badge}>
                <Ionicons size={SIZE.lg} name="logo-twitter" />{twitter_username}
              </P>}
            </SpaceBetween>
          </SpaceBetween>
        </>}
        left={() => (
          <Avatar.Image size={SIZE.xxxl} source={{ uri: avatar_url }} />
        )}
        right={() => <List.Icon icon="chevron-right" />}
        style={containerStyle}
        accessibilityRole="link"
        accessibilityLabel={t("GithubUserList.accessibilityLabel", {
          username: login,
        })}
        accessibilityHint={t("GithubUserList.accessibilityHint")}
      />
  )
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    display: 'flex',
    gap: SIZE.md,
  }
})