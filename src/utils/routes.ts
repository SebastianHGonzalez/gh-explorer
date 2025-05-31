import { Route } from "@react-navigation/native";

export type AppRoute<R extends RouteName> = Route<R, RouteParams<R>>;

export enum RouteName {
  ListGithubUsersScreen = "ListGithubUsersScreen",
  SearchGithubUsersScreen = "SearchGithubUsersScreen",
  FavoritesScreen = "FavoritesScreen",
  GithubUserDescriptionScreen = "GithubUserDescriptionScreen",
}

type Params = {
  [RouteName.GithubUserDescriptionScreen]: { login: string }
};

export type RouteParams<R extends RouteName> = R extends keyof Params ? Params[R] : undefined;

export function route(id: RouteName, params: Record<string, string> = {}): string {
  let path: string = id;
  for (const [key, value] of Object.entries(params)) {
    path = path.replace(`[${key}]`, value);
  }
  return path;
}

