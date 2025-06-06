import { Route } from "@react-navigation/native";

export type AppRoute<R extends AppRouteName> = Route<R, AppScreenParams<R>>;

export enum AppRouteName {
  Tabs = "(tabs)",
  ListGithubUsersTabScreen = "ListGithubUsersTabScreen",
  SearchGithubUsersTabScreen = "SearchGithubUsersTabScreen",
  FavoritesTabScreen = "FavoritesTabScreen",
  ListGithubUsersScreen = "ListGithubUsersScreen",
  SearchGithubUsersScreen = "SearchGithubUsersScreen",
  FavoritesScreen = "FavoritesScreen",
  GithubUserDescriptionScreen = "GithubUserDescriptionScreen",
}

export type ScreenParams = {
  [AppRouteName.Tabs]: {};
  [AppRouteName.ListGithubUsersTabScreen]: {};
  [AppRouteName.SearchGithubUsersTabScreen]: {};
  [AppRouteName.FavoritesTabScreen]: {};
  [AppRouteName.ListGithubUsersScreen]: {};
  [AppRouteName.SearchGithubUsersScreen]: {};
  [AppRouteName.FavoritesScreen]: {};
  [AppRouteName.GithubUserDescriptionScreen]: {
    login: string;
    avatar_url?: string;
  };
};

export type AppScreenParams<R extends AppRouteName> =
  R extends keyof ScreenParams ? ScreenParams[R] : undefined;

export type ListStackParamList = Pick<
  ScreenParams,
  AppRouteName.ListGithubUsersScreen | AppRouteName.GithubUserDescriptionScreen
>;

export type SearchStackParamList = Pick<
  ScreenParams,
  | AppRouteName.SearchGithubUsersScreen
  | AppRouteName.GithubUserDescriptionScreen
>;

export type FavoritesStackParamList = Pick<
  ScreenParams,
  AppRouteName.FavoritesScreen | AppRouteName.GithubUserDescriptionScreen
>;
