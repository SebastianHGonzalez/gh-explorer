import { StyleSheet, Text, View } from "react-native";
import { useGithubListUsers } from "../hooks/useGithubListUsers";

export default function Page() {
const query = useGithubListUsers()

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle}>This is the first pepita page of your app.</Text>
        <Text>{JSON.stringify(query.data,undefined,2)}</Text>
        <Text>{JSON.stringify(query.status)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
