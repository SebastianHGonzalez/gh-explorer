import { DescribeUser, describeUserQuery } from "@/apis/github/users/[login]";
import { t } from "@/i18n/t";
import { AppRouteName } from "@/navigation/types";
import { useLinkProps } from "@react-navigation/native";
import { ListRenderItemInfo } from "@shopify/flash-list";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { List } from "react-native-paper";
import { AppAvatarImage } from "./common/AppAvatarImage";
import { P } from "./common/P";
import { SpaceBetween } from "./common/SpaceBetween";
import { Stat } from "./common/Stat";
import { useContainerStyle } from "./common/useContainerStyle";
import { useTextStyle } from "./common/useTextStyle";

type Item = {
  avatar_url?: string;
  login: string;
};

export function GithubUserListItem(props: ListRenderItemInfo<Item>) {
  const fallback = <InternalGithubUserListItem {...props} />;

  return (
    <ErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <DetailedGithubUserListItem {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}

function InternalGithubUserListItem({
  item: { login, avatar_url },
  details,
}: ListRenderItemInfo<Item> & { details?: DescribeUser }) {
  const { name, company, email, followers, public_repos, twitter_username } =
    details ?? {};
  const avatarUrl = details?.avatar_url ?? avatar_url;

  const containerStyle = useContainerStyle();

  const linkProps = useLinkProps({
    screen: AppRouteName.GithubUserDescriptionScreen,
    params: { login, avatar_url: avatarUrl },
  });

  const h2Style = useTextStyle("h2");

  return (
    <List.Item
      {...linkProps}
      title={name || login}
      titleStyle={h2Style}
      description={
        <SpaceBetween direction="vertical">
          {name && login && (
            <P>
              {name && login} {company}
            </P>
          )}

          {email && <P>{email}</P>}

          <SpaceBetween size="lg">
            {followers && (
              <Stat iconSize="lg" iconName="followers">
                {followers}
              </Stat>
            )}
            {public_repos && (
              <Stat iconSize="lg" iconName="repos">
                {public_repos}
              </Stat>
            )}
            {twitter_username && (
              <Stat iconSize="lg" iconName="twitter">
                {twitter_username}
              </Stat>
            )}
          </SpaceBetween>
        </SpaceBetween>
      }
      left={() => (
        <AppAvatarImage
          sharedTransitionTag={`avatar.${login}`}
          size="xxxl"
          source={{ uri: avatarUrl }}
        />
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

function DetailedGithubUserListItem(props: ListRenderItemInfo<Item>) {
  const query = useSuspenseQuery(describeUserQuery(props.item.login));
  const details = query.data;

  return <InternalGithubUserListItem {...props} details={details} />;
}
