import { RouteName, RouteParams } from "@/utils/routes";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

export function useAppNavigate() {
    const { navigate } = useNavigation();

    return useCallback(<R extends RouteName>(route: R, params?: RouteParams<R>, options?: { merge?: boolean, pop?: boolean }) => (navigate as any)(route, params, options), []);
}
