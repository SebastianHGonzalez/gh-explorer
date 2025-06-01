import { NavigatorScreenParams, Route } from "@react-navigation/native";

export type AppRoute<R extends AppRouteName> = Route<R, AppScreenParams<R>>;

export enum AppRouteName {
  Tabs = '(tabs)',
  ListGithubUsersScreen = "ListGithubUsersScreen",
  SearchGithubUsersScreen = "SearchGithubUsersScreen",
  FavoritesScreen = "FavoritesScreen",
  GithubUserDescriptionScreen = "GithubUserDescriptionScreen",
}

type ScreenParams = {
  [AppRouteName.GithubUserDescriptionScreen]: { login: string };
};

export type AppScreenParams<R extends AppRouteName> = R extends keyof ScreenParams ? ScreenParams[R] : undefined;

export type ListStackParamList = {
  ListGithubUsersScreen: undefined;
  GithubUserDescriptionScreen: { login: string };
};

export type SearchStackParamList = {
  SearchGithubUsersScreen: undefined;
  GithubUserDescriptionScreen: { login: string };
};

export type FavoritesStackParamList = {
  FavoritesScreen: undefined;
  GithubUserDescriptionScreen: { login: string };
};

export type AppParamList = {
  Tabs: undefined;
  ListGithubUsersScreen: NavigatorScreenParams<ListStackParamList>;
  SearchGithubUsersScreen: NavigatorScreenParams<SearchStackParamList>;
  FavoritesScreen: NavigatorScreenParams<FavoritesStackParamList>;
};
