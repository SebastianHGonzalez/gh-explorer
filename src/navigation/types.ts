import { NavigatorScreenParams, Route } from "@react-navigation/native";

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

type ScreenParams = {
  [AppRouteName.GithubUserDescriptionScreen]: { login: string };
};

export type AppScreenParams<R extends AppRouteName> =
  R extends keyof ScreenParams ? ScreenParams[R] : undefined;

export type ListStackParamList = {
  [AppRouteName.ListGithubUsersScreen]: undefined;
  [AppRouteName.GithubUserDescriptionScreen]: {
    login: string;
    avatar_url?: string;
  };
};

export type SearchStackParamList = {
  [AppRouteName.SearchGithubUsersScreen]: undefined;
  [AppRouteName.GithubUserDescriptionScreen]: {
    login: string;
    avatar_url?: string;
  };
};

export type FavoritesStackParamList = {
  [AppRouteName.FavoritesScreen]: undefined;
  [AppRouteName.GithubUserDescriptionScreen]: {
    login: string;
    avatar_url?: string;
  };
};

export type AppParamList = {
  [AppRouteName.Tabs]: undefined;
  [AppRouteName.ListGithubUsersTabScreen]: NavigatorScreenParams<ListStackParamList>;
  [AppRouteName.SearchGithubUsersTabScreen]: NavigatorScreenParams<SearchStackParamList>;
  [AppRouteName.FavoritesTabScreen]: NavigatorScreenParams<FavoritesStackParamList>;
};
