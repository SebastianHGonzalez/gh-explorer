import { describeUserQuery } from "@/apis/github/users/[login]";
import { t } from "@/i18n/t";
import { AppRouteName } from "@/navigation/types";
import { SIZE } from "@/styles/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLinkProps } from "@react-navigation/native";
import { ListRenderItemInfo } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { Avatar, List } from "react-native-paper";
import { AppSharedElement } from "./common/AppSharedElement";
import { H2 } from "./common/H2";
import { P } from "./common/P";
import { SpaceBetween } from "./common/SpaceBetween";
import { useContainerStyle } from "./common/useContainerStyle";

type Item = {
  avatar_url: string;
  login: string;
};

export function GithubUserListItem({
  item: { login, avatar_url },
}: ListRenderItemInfo<Item>) {
  const query = useQuery({ ...describeUserQuery(login) });
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

  const linkProps = useLinkProps({
    screen: AppRouteName.GithubUserDescriptionScreen,
    params: { login, avatar_url },
  });

  return (
    <List.Item
      {...linkProps}
      title={
        <>
          <H2>{name || login}</H2>
        </>
      }
      description={
        <SpaceBetween direction="vertical">
          {name && login && (
            <P>
              {name && login} {company}
            </P>
          )}

          {email && <P>{email}</P>}

          <SpaceBetween>
            {followers && (
              <SpaceBetween size="sm">
                <P>
                  <Ionicons size={SIZE.lg} name="person" />
                </P>
                <P>{followers}</P>
              </SpaceBetween>
            )}
            {public_repos && (
              <SpaceBetween size="sm">
                <P>
                  <Ionicons size={SIZE.lg} name="book-sharp" />
                </P>
                <P>{public_repos}</P>
              </SpaceBetween>
            )}
            {twitter_username && (
              <SpaceBetween size="sm">
                <P>
                  <Ionicons size={SIZE.lg} name="logo-twitter" />
                </P>
                <P>{twitter_username}</P>
              </SpaceBetween>
            )}
          </SpaceBetween>
        </SpaceBetween>
      }
      left={() => (
        <AppSharedElement id={`avatar.${avatar_url}`}>
          <Avatar.Image size={SIZE.xxxl} source={{ uri: avatar_url }} />
        </AppSharedElement>
      )}
      right={() => <List.Icon icon="chevron-right" />}
      style={containerStyle}
      accessibilityRole="link"
      accessibilityLabel={t("GithubUserList.accessibilityLabel", {
        username: login,
      })}
      accessibilityHint={t("GithubUserList.accessibilityHint")}
    />
  );
}
