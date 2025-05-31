import { describeUserQuery } from "@/apis/github/users/[login]";
import { H1 } from "@/components/common/H1";
import { P } from "@/components/common/P";
import { Screen } from "@/components/common/Screen";
import { SIZE } from "@/styles/constants";
import { AppRoute, RouteName } from "@/utils/routes";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import { Avatar, useTheme } from "react-native-paper";

export function GithubUserDescriptionScreen({ route }: { route: AppRoute<RouteName.GithubUserDescriptionScreen> }) {
  const { login } = route.params
  const query = useQuery(describeUserQuery(login));
  const user = query.data;
const theme = useTheme();
  return (
    <Screen>
      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar.Image size={250} source={{ uri: user?.avatar_url }} />
        <H1 style={{ margin: SIZE.xxl }}>{user?.name}</H1>
      </View>
      <P>{ JSON.stringify(theme.fonts, undefined, 2)}</P>
      <P>bio: {user?.bio}</P>
      <P>location: {user?.location}</P>
      <P>company: {user?.company}</P>
      <P>email: {user?.email}</P>
      <P>blog: {user?.blog}</P>
      <P>twitter_username: {user?.twitter_username}</P>
      <P>created_at: {user?.created_at}</P>
      <P>updated_at: {user?.updated_at}</P>
      <P>public_repos: {user?.public_repos}</P>
      <P>public_gists: {user?.public_gists}</P>
      <P>followers: {user?.followers}</P>
      <P>following: {user?.following}</P>
      <P>hireable: {user?.hireable ? "Yes" : "No"}</P>
      <P>type: {user?.type}</P>
      <P>site_admin: {user?.site_admin ? "Yes" : "No"}</P>
      <P>id: {user?.id}</P>
      <P>node_id: {user?.node_id}</P>
      <P>url: {user?.url}</P>
      <P>html_url: {user?.html_url}</P>
      <P>followers_url: {user?.followers_url}</P>
      <P>following_url: {user?.following_url}</P>
      <P>gists_url: {user?.gists_url}</P>
      <P>starred_url: {user?.starred_url}</P>
      <P>subscriptions_url: {user?.subscriptions_url}</P>
      <P>organizations_url: {user?.organizations_url}</P>
      <P>repos_url: {user?.repos_url}</P>
      <P>events_url: {user?.events_url}</P>
      <P>received_events_url: {user?.received_events_url}</P>
    </Screen>
  );
}
