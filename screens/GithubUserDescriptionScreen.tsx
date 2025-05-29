import { describeUserQuery } from "@/apis/github/users/[login]";
import { H1, ROOT, SIZE } from "@/styles/constants";
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
    <View style={ROOT}>
      <Avatar.Image size={SIZE.xxxl} source={{ uri: user.avatar_url }} />
      <Text style={H1}>{user.name}</Text>
    </View>
  );
}
