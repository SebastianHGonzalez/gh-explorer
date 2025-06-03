import {
    PropsWithChildren
} from "react";
import {
    Image, View
} from "react-native";

export function ErrorMessage({ children }: PropsWithChildren) {
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
        source={require("@/../assets/svg/page-error.svg")}
        style={{
          width: "100%",
          height: 400, // or use 'flex: 1' for full height
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
