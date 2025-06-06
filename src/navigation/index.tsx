import { AppIcon } from "@/components/common/AppIcon";
import { FavoriteUserButton } from "@/components/FavoriteUserButton";
import { t } from "@/i18n/t";
import {
  AppRouteName,
  FavoritesStackParamList,
  ListStackParamList,
  SearchStackParamList,
} from "@/navigation/types";
import { SIZE } from "@/styles/constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ComponentProps } from "react";
import { useTheme } from "react-native-paper";
import { FavoritesScreen } from "./screens/FavoritesScreen";
import { GithubUserDescriptionScreen } from "./screens/GithubUserDescriptionScreen";
import { ListGithubUsersScreen } from "./screens/ListGithubUsersScreen";
import { SearchGithubUsersScreen } from "./screens/SearchGithubUsersScreen";

function useStackOptions() {
  const theme = useTheme();

  return {
    screenOptions: {
      headerStyle: {
        backgroundColor: theme.colors.surface,
      },
      headerTintColor: theme.colors.onSurface,
      contentStyle: { backgroundColor: theme.colors.surface },
    },
  } as const;
}

const ListStack = createNativeStackNavigator<ListStackParamList>();
function ListStackScreen() {
  const props = useStackOptions();

  return (
    <ListStack.Navigator
      initialRouteName={AppRouteName.ListGithubUsersScreen}
      {...props}
    >
      <ListStack.Screen
        name={AppRouteName.ListGithubUsersScreen}
        component={ListGithubUsersScreen}
        options={{ title: t("ListGithubUsersScreen.title") }}
      />
      <ListStack.Screen
        name={AppRouteName.GithubUserDescriptionScreen}
        component={GithubUserDescriptionScreen}
        options={({ route: { params } }) => ({
          title: t("GithubUserDescriptionScreen.title", params),
          headerRight: () => <FavoriteUserButton login={params.login} style={{ paddingRight: SIZE.lg }} />,
        })}
      />
    </ListStack.Navigator>
  );
}

const SearchStack = createNativeStackNavigator<SearchStackParamList>();
function SearchStackScreen() {
  const props = useStackOptions();

  return (
    <SearchStack.Navigator
      initialRouteName={AppRouteName.SearchGithubUsersScreen}
      {...props}
    >
      <SearchStack.Screen
        name={AppRouteName.SearchGithubUsersScreen}
        component={SearchGithubUsersScreen}
        options={{ title: t("SearchGithubUsersScreen.title") }}
      />
      <SearchStack.Screen
        name={AppRouteName.GithubUserDescriptionScreen}
        component={GithubUserDescriptionScreen}
        options={({ route: { params } }) => ({
          title: t("GithubUserDescriptionScreen.title", params),
          headerRight: () => <FavoriteUserButton login={params.login} style={{ paddingRight: SIZE.lg }} />,
        })}
      />
    </SearchStack.Navigator>
  );
}

const FavoritesStack = createNativeStackNavigator<FavoritesStackParamList>();
function FavoritesStackScreen() {
  const props = useStackOptions();

  return (
    <FavoritesStack.Navigator
      initialRouteName={AppRouteName.FavoritesScreen}
      {...props}
    >
      <FavoritesStack.Screen
        name={AppRouteName.FavoritesScreen}
        component={FavoritesScreen}
        options={{ title: t("FavoritesScreen.title") }}
      />
      <FavoritesStack.Screen
        name={AppRouteName.GithubUserDescriptionScreen}
        component={GithubUserDescriptionScreen}
        options={({ route: { params } }) => ({
          title: t("GithubUserDescriptionScreen.title", params),
          headerRight: () => <FavoriteUserButton login={params.login} style={{ paddingRight: SIZE.lg }} />,
        })}
      />
    </FavoritesStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function TabsStack() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName={AppRouteName.ListGithubUsersTabScreen}
      screenOptions={{
        sceneStyle: { backgroundColor: theme.colors.surface },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurface,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.onSurface,
        },
        tabBarLabelStyle: theme.fonts.labelSmall,
        animation: "shift",
        transitionSpec: {
          animation: "timing",
          config: {
            duration: 100,
          },
        },
      }}
    >
      <Tab.Screen
        name={AppRouteName.ListGithubUsersTabScreen}
        component={ListStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: t("ListStackScreen.tab"),
          tabBarIcon: ({ color, size, focused }) => (
            <AppIcon name={focused ? 'tabHomeFocused' : 'tabHome'} color={color as never} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={AppRouteName.SearchGithubUsersTabScreen}
        component={SearchStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: t("SearchStackScreen.tab"),
          tabBarIcon: ({ color, size, focused }) => (
            <AppIcon name={focused ? 'tabSearchFocused' : 'tabSearch'} color={color as never} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={AppRouteName.FavoritesTabScreen}
        component={FavoritesStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: t("FavoritesStackScreen.tab"),
          tabBarIcon: ({ color, size, focused }) => (
            <AppIcon name={focused ? 'tabFavoritesFocused' : 'tabFavorites'} color={color as never} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
export function RootStack() {
  const props = useStackOptions();

  return (
    <Stack.Navigator
      initialRouteName={AppRouteName.Tabs}
      {...props}
      screenOptions={{
        ...props.screenOptions,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={AppRouteName.Tabs}
        component={TabsStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const linking = {
  prefixes: ["gh-explorer://"],
  config: {
    screens: {
      [AppRouteName.Tabs]: {
        path: "",
        screens: {
          [AppRouteName.ListGithubUsersTabScreen]: {
            path: "",
            screens: {
              [AppRouteName.ListGithubUsersScreen]: "",
              [AppRouteName.GithubUserDescriptionScreen]: "users/:login",
            },
          },
          [AppRouteName.SearchGithubUsersTabScreen]: {
            path: "search",
            screens: {
              [AppRouteName.SearchGithubUsersScreen]: "",
              [AppRouteName.GithubUserDescriptionScreen]: "users/:login",
            },
          },
          [AppRouteName.FavoritesTabScreen]: {
            path: "favorites",
            screens: {
              [AppRouteName.FavoritesScreen]: "",
              [AppRouteName.GithubUserDescriptionScreen]: "users/:login",
            },
          },
        },
      },
    },
  },
};

export function AppNavigationContainer(
  props: ComponentProps<typeof NavigationContainer>,
) {
  return <NavigationContainer linking={linking} {...props} />;
}
