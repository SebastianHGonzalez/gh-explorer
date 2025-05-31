import { describeUserQuery } from "@/apis/github/users/[login]";
import { t } from "@/i18n/t";
import { SIZE } from "@/styles/constants";
import { Route, route } from "@/utils/routes";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { Suspense } from "react";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import { Avatar, List } from "react-native-paper";
import { ErrorBoundary } from "./common/ErrorBoundary";
import { H2 } from "./common/H2";
import { H3 } from "./common/H3";
import { P } from "./common/P";
import { SpaceBetween } from "./common/SpaceBetween";
import { useContainerStyle } from "./common/useContainerStyle";

type Item = {
  avatar_url: string,
  login: string,
};

export function GithubUserListItem(props: ListRenderItemInfo<Item>) {
  const fallback = <SimpleListItem {...props} />;

  return (
    <ErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <DetailedListItem {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}

function SimpleListItem({ item: { avatar_url, login } }: ListRenderItemInfo<Item>) {
  const containerStyle = useContainerStyle();

  return (
    <Link href={route(Route.DescribeGithubUser, { login })} asChild>
      <List.Item
        title={<>
          <H2>{login}</H2>
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
    </Link>
  )
}

function DetailedListItem({ item: { avatar_url, login } }: ListRenderItemInfo<Item>) {
  const query = useSuspenseQuery({ ...describeUserQuery(login), })
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

  return (
    <Link href={route(Route.DescribeGithubUser, { login })} asChild>
      <List.Item
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
    </Link>
  )
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    display: 'flex',
    gap: SIZE.md,
  }
})