import { PropsWithChildren } from "react";
import {
    Image, View
} from "react-native";
import EmptyFavoritesSVG from "@/../assets/svg/empty-favorites.svg";

export function EmptyFavorites({ children }: PropsWithChildren) {
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
      <EmptyFavoritesSVG
        width="100%"
        height={400}
        style={{
          maxWidth: "100%",
        }}
        resizeMode="contain"
      />

      {children && (
        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          {children}
        </View>
      )}
    </View>
  );
}
