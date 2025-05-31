import { describeUserQuery } from "@/apis/github/users/[login]";
import { t } from "@/i18n/t";
import { SIZE } from "@/styles/constants";
import { Route, route } from "@/utils/routes";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { ListRenderItemInfo, StyleSheet, Text } from "react-native";
import { Avatar, List } from "react-native-paper";
import { useContainerStyle } from "./common/useContainerStyle";
import { useTextStyle } from "./common/useTextStyle";
import { SpaceBetween } from "./common/SpaceBetween";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Suspense } from "react";
import { ErrorBoundary } from "./common/ErrorBoundary";

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
  const h2Style = useTextStyle('h2');

  return (
    <Link href={route(Route.DescribeGithubUser, { login })} asChild>
      <List.Item
        title={<>
          <Text style={h2Style}>{login}</Text>
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
  const h2Style = useTextStyle('h2');
  const h3Style = useTextStyle('h3');

  return (
    <Link href={route(Route.DescribeGithubUser, { login })} asChild>
      <List.Item
        title={<>
          <Text style={h2Style}>{name || login}</Text>
          {name && login && <Text style={{ ...h3Style, fontStyle: 'italic', }}>{" - "}{name && login}</Text>}
        </>}
        description={<>
          <SpaceBetween direction="vertical">
            {bio && <Text>
              {bio}
            </Text>}

            {company && <Text>
              {company}
            </Text>}

            {email && <Text>
              {email}
            </Text>}

            <SpaceBetween>
              <Text style={styles.badge}>
                <Ionicons size={SIZE.lg} name="person" />{followers}
              </Text>
              <Text style={styles.badge}>
                <Ionicons size={SIZE.lg} name="book-sharp" />{public_repos}
              </Text>
              {twitter_username && <Text style={styles.badge}>
                <Ionicons size={SIZE.lg} name="logo-twitter" />{twitter_username}
              </Text>}
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