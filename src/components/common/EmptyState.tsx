import {
    Image, View
} from "react-native";

export function EmptyState() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: 600,
      }}
    >
      <Image
        source={require("@/../assets/svg/space-exploration.svg")}
        style={{
          width: "100%",
          height: 400, // or use 'flex: 1' for full height
        }}
        resizeMode="contain"
      />
    </View>
  );
}
