import {
    Image, View
} from "react-native";
import SpaceExplorationSVG from "@/../assets/svg/space-exploration.svg";

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
      <SpaceExplorationSVG
        width="100%"
        height={400}
        style={{
          maxWidth: "100%",
        }}
        resizeMode="contain"
      />
    </View>
  );
}
