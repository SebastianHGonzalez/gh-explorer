import { PropsWithChildren } from "react";
import { AppIconName, AppIcon, AppIconColor } from "./AppIcon";
import { P } from "./P";
import { SpaceBetween } from "./SpaceBetween";

interface StatProp {
  iconName: AppIconName;
  iconColor?: AppIconColor;
}

export function Stat({
  iconName,
  iconColor,
  children,
}: PropsWithChildren<StatProp>) {
  return (
    <SpaceBetween align="center">
      <AppIcon name={iconName} color={iconColor} />
      <P>{children}</P>
    </SpaceBetween>
  );
}
