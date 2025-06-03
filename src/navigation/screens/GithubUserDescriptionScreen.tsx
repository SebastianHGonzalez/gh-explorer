import { describeUserQuery } from "@/apis/github/users/[login]";
import { AppAvatarImage } from "@/components/common/AppAvatarImage";
import { AppExternalLink } from "@/components/common/AppExternalLink";
import { AppRefreshControl } from "@/components/common/AppRefreshControl";
import { renderErrorAlert } from "@/components/common/ErrorAlert";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { H1 } from "@/components/common/H1";
import { H2 } from "@/components/common/H2";
import { P } from "@/components/common/P";
import { Screen } from "@/components/common/Screen";
import { SpaceBetween } from "@/components/common/SpaceBetween";
import { Stat } from "@/components/common/Stat";
import { t } from "@/i18n/t";
import { AppRouteName, ScreenParams } from "@/navigation/types";
import { SIZE } from "@/styles/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { ScrollView } from "react-native-gesture-handler";

type Props = NativeStackScreenProps<
  ScreenParams,
  AppRouteName.GithubUserDescriptionScreen
>;

export function GithubUserDescriptionScreen({ route }: Props) {
  const { login, avatar_url } = route.params;

  return (
    <Screen
      style={{
        paddingTop: SIZE.xxl,
      }}
    >
      <Suspense>
        <ErrorBoundary renderFallback={renderErrorAlert}>
          <UserHeader login={login} avatarUrl={avatar_url} />
        </ErrorBoundary>
      </Suspense>

      <Suspense>
        <ErrorBoundary renderFallback={renderErrorAlert}>
          <UserRepos login={login} />
        </ErrorBoundary>
      </Suspense>
    </Screen>
  );
}

function UserHeader({
  login,
  avatarUrl,
}: {
  login: string;
  avatarUrl?: string;
}) {
  const query = useSuspenseQuery(describeUserQuery(login));
  const user = query.data;

  return (
    <ScrollView
      refreshControl={
        <AppRefreshControl
          refreshing={query.isRefetching}
          onRefresh={query.refetch}
        />
      }
    >
      <SpaceBetween direction="vertical" size="xl" align="center">
        <AppAvatarImage
          sharedTransitionTag={`avatar.${login}`}
          size={140}
          source={{ uri: user?.avatar_url || avatarUrl }}
        />

        <SpaceBetween direction="vertical" align="center" size="sm">
          <H1>{user?.name || login}</H1>
          <H2>@{login}</H2>
          {user?.bio ? <P>{user.bio}</P> : null}
        </SpaceBetween>

        {(user?.company || user?.location) && (
          <SpaceBetween direction="vertical" align="center" size="sm">
            {user?.company ? (
              <Stat iconName="company" iconColor="onSurface">
                <P>{user.company}</P>
              </Stat>
            ) : null}
            {user?.location ? (
              <Stat iconName="location" iconColor="onSurface">
                <P>{user.location}</P>
              </Stat>
            ) : null}
          </SpaceBetween>
        )}

        {(user?.email || user?.blog || user?.twitter_username) && (
          <SpaceBetween size="xl" justify="center" align="center">
            {user?.email ? (
              <Stat iconName="email" iconColor="onSurface">
                <AppExternalLink href={`mailto:${user.email}`}>
                  <P>{user.email}</P>
                </AppExternalLink>
              </Stat>
            ) : null}
            {user?.blog ? (
              <Stat iconName="blog" iconColor="onSurface">
                <AppExternalLink
                  href={
                    user.blog.startsWith("http")
                      ? user.blog
                      : `https://${user.blog}`
                  }
                >
                  <P>{user.blog.replace(/^https?:\/\//, "")}</P>
                </AppExternalLink>
              </Stat>
            ) : null}
            {user?.twitter_username ? (
              <AppExternalLink
                href={`https://twitter.com/${user.twitter_username}`}
              >
                <Stat iconName="twitter">
                  <P>@{user.twitter_username}</P>
                </Stat>
              </AppExternalLink>
            ) : null}
          </SpaceBetween>
        )}

        <SpaceBetween justify="center" size="xl">
          <Stat iconName="followers">
            <P>
              <P>{user?.followers ?? "?"}</P>{" "}
              {t("GithubUserDescriptionScreen.followers")}
            </P>
          </Stat>
          <Stat iconName="following">
            <P>
              <P>{user?.following ?? "?"}</P>{" "}
              {t("GithubUserDescriptionScreen.following")}
            </P>
          </Stat>

          <Stat iconName="repos">
            <P>{user?.public_repos ?? "?"}</P>{" "}
            {t("GithubUserDescriptionScreen.repos")}
          </Stat>
        </SpaceBetween>
      </SpaceBetween>
    </ScrollView>
  );
}

function UserRepos({ login }: { login: string }) {
  return null;
}
