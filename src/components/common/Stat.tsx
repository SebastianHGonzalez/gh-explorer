import { PropsWithChildren } from "react";
import { AppIconName, AppIcon, AppIconColor, AppIconSize } from "./AppIcon";
import { P } from "./P";
import { SpaceBetween } from "./SpaceBetween";

interface StatProp {
  iconName: AppIconName;
  iconColor?: AppIconColor;
  iconSize?: AppIconSize;
}

export function Stat({
  iconName,
  iconColor,
  iconSize = "xl",
  children,
}: PropsWithChildren<StatProp>) {
  return (
    <SpaceBetween align="center">
      <AppIcon name={iconName} color={iconColor} size={iconSize} />
      <P>{children}</P>
    </SpaceBetween>
  );
}
