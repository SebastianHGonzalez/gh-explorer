import { GithubUserList } from "@/components/GithubUserList";
import { ROOT } from "@/styles/constants";
import { Suspense } from "react";
import { View } from "react-native";

export function ListGithubUsersScreen() {
  return (
    <View style={ROOT}>
      <Suspense>
        <GithubUserList />
      </Suspense>
    </View>
  );
}
