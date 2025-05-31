import { SIZE } from "@/styles/constants";
import { PropsWithChildren } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Slot } from "./Slot";

type Size = keyof typeof SIZE;

interface SpaceBetweenProps {
    direction?: Direction
    size?: Size;
    style?: ViewStyle
    asChild?: boolean
}

type Direction = 'vertical' | 'horizontal'

const directionStyle: Record<Direction, ViewStyle> = {
    horizontal: { flexDirection: 'row' },
    vertical: { flexDirection: 'column' }
}

const baseStyle: ViewStyle = {
    display: 'flex',
}

export function SpaceBetween({
    direction = 'horizontal',
    size = 'md',
    style,
    asChild,
    children,
}: PropsWithChildren<SpaceBetweenProps>) {
    const Comp = asChild ? Slot : View;

    return (
        <Comp style={StyleSheet.flatten([baseStyle, directionStyle[direction], { gap: SIZE[size] }, style])}>
            {children}
        </Comp>
    )
}