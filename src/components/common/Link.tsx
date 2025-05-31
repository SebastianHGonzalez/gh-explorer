import { Route } from "@/utils/routes";
import { useNavigation } from "@react-navigation/native";
import { PropsWithChildren, useCallback } from "react";
import { Pressable } from "react-native";
import { Slot } from "./Slot";

interface LinkProps {
    href: Route
    params?: any,
    asChild?: boolean,
    merge?: boolean;
    pop?: boolean
}

export function Link({
    children,
    href,
    params,
    asChild,
    merge,
    pop,
}: PropsWithChildren<LinkProps>) {
    const n = useNavigation();
    const handlePress = useCallback(() => {
        n.navigate(href, params, { merge, pop })
    }, []);

    const Comp = asChild ? Slot : Pressable;

    return <Comp onPress={handlePress}>{children}</Comp>
}
