import { useCallback } from "react";
import { Linking } from "react-native";
import { PropsWithChildren } from "react";
import { TouchableOpacity } from "react-native";

interface AppExternalLinkProps {
  href: string;
}

export function AppExternalLink({
  href,
  children,
}: PropsWithChildren<AppExternalLinkProps>) {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(href);
    
    if (supported) {
      await Linking.openURL(href);
    }
  }, [href]);

  return (
    <TouchableOpacity onPress={handlePress}>
      {children}
    </TouchableOpacity>
  );
}
