import { describeUserQuery } from "@/apis/github/users/[login]";
import { H1, ROOT, SIZE, SURFACE } from "@/styles/constants";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Suspense } from "react";
import { Text, View } from "react-native";
import { Avatar } from "react-native-paper";

type GithubUserDescriptionScreenLocalSearchParams = {
  login: string;
};

export function GithubUserDescriptionScreen() {
  const { login } =
    useLocalSearchParams<GithubUserDescriptionScreenLocalSearchParams>();

  return (
    <View style={ROOT}>
      <Suspense>
        <GithubUser login={login} />
      </Suspense>
    </View>
  );
}

function GithubUser({ login }: { login: string }) {
  const query = useSuspenseQuery({ ...describeUserQuery(login) });
  const user = query.data;

  return (
    <>
      <Avatar.Image size={SIZE.xxxl} source={{ uri: user.avatar_url }} />
      <Text style={H1}>{user.name}</Text>
    </>
  );
}
