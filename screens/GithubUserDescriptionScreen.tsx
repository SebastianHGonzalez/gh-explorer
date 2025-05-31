import { describeUserQuery } from "@/apis/github/users/[login]";
import { H1 } from "@/components/common/H1";
import { Screen } from "@/components/common/Screen";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { Avatar } from "react-native-paper";

type GithubUserDescriptionScreenLocalSearchParams = {
  login: string;
};

export function GithubUserDescriptionScreen() {
  const { login } =
    useLocalSearchParams<GithubUserDescriptionScreenLocalSearchParams>();
  const query = useSuspenseQuery(describeUserQuery(login));
  const user = query.data;

  return (
    <Screen>
      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar.Image size={250} source={{ uri: user.avatar_url }} />
      <H1>{user.name}</H1>
      </View>
      <Text>bio: {user.bio}</Text>
      <Text>location: {user.location}</Text>
      <Text>company: {user.company}</Text>
      <Text>email: {user.email}</Text>
      <Text>blog: {user.blog}</Text>
      <Text>twitter_username: {user.twitter_username}</Text>
      <Text>created_at: {user.created_at}</Text>
      <Text>updated_at: {user.updated_at}</Text>
      <Text>public_repos: {user.public_repos}</Text>
      <Text>public_gists: {user.public_gists}</Text>
      <Text>followers: {user.followers}</Text>
      <Text>following: {user.following}</Text>
      <Text>hireable: {user.hireable ? "Yes" : "No"}</Text>
      <Text>type: {user.type}</Text>
      <Text>site_admin: {user.site_admin ? "Yes" : "No"}</Text>
      <Text>id: {user.id}</Text>
      <Text>node_id: {user.node_id}</Text>
      <Text>url: {user.url}</Text>
      <Text>html_url: {user.html_url}</Text>
      <Text>followers_url: {user.followers_url}</Text>
      <Text>following_url: {user.following_url}</Text>
      <Text>gists_url: {user.gists_url}</Text>
      <Text>starred_url: {user.starred_url}</Text>
      <Text>subscriptions_url: {user.subscriptions_url}</Text>
      <Text>organizations_url: {user.organizations_url}</Text>
      <Text>repos_url: {user.repos_url}</Text>
      <Text>events_url: {user.events_url}</Text>
      <Text>received_events_url: {user.received_events_url}</Text>
    </Screen>
  );
}
