import { AppRouteName } from '@/navigation/types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ComponentProps } from 'react';
import { useTheme } from 'react-native-paper';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { GithubUserDescriptionScreen } from './screens/GithubUserDescriptionScreen';
import { ListGithubUsersScreen } from './screens/ListGithubUsersScreen';
import { SearchGithubUsersScreen } from './screens/SearchGithubUsersScreen';


function useStackOptions() {
  const theme = useTheme();

  return {
    screenOptions: {
      headerStyle: { backgroundColor: theme.colors.surface },
      headerTintColor: theme.colors.onSurface,
      sceneStyle: { backgroundColor: theme.colors.surface },
      contentStyle: { backgroundColor: theme.colors.surface },
    }
  }
}

const ListStack = createNativeStackNavigator();
function ListStackScreen() {
  const props = useStackOptions();

  return (
    <ListStack.Navigator initialRouteName={AppRouteName.ListGithubUsersScreen} {...props}>
      <ListStack.Screen name={AppRouteName.ListGithubUsersScreen} component={ListGithubUsersScreen} />
      <ListStack.Screen name={AppRouteName.GithubUserDescriptionScreen} component={GithubUserDescriptionScreen as never} />
    </ListStack.Navigator>
  );
}

const SearchStack = createNativeStackNavigator();
function SearchStackScreen() {
  const props = useStackOptions();

  return (
    <SearchStack.Navigator initialRouteName={AppRouteName.SearchGithubUsersScreen} {...props}>
      <SearchStack.Screen name={AppRouteName.SearchGithubUsersScreen} component={SearchGithubUsersScreen} />
      <SearchStack.Screen name={AppRouteName.GithubUserDescriptionScreen} component={GithubUserDescriptionScreen as never} />
    </SearchStack.Navigator>
  );
}

const FavoritesStack = createNativeStackNavigator();
function FavoritesStackScreen() {
  const props = useStackOptions();

  return (
    <FavoritesStack.Navigator initialRouteName={AppRouteName.FavoritesScreen} {...props}>
      <FavoritesStack.Screen name={AppRouteName.FavoritesScreen} component={FavoritesScreen} />
      <FavoritesStack.Screen name={AppRouteName.GithubUserDescriptionScreen} component={GithubUserDescriptionScreen as never} />
    </FavoritesStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function TabsStack() {
  const props = useStackOptions();

  return (
    <Tab.Navigator
      initialRouteName={AppRouteName.ListGithubUsersScreen}
      {...props}>
      <Tab.Screen name={AppRouteName.ListGithubUsersScreen} component={ListStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name={AppRouteName.SearchGithubUsersScreen} component={SearchStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name={AppRouteName.FavoritesScreen} component={FavoritesStackScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
export function RootStack() {
  const props = useStackOptions();


  return (
    <Stack.Navigator
      initialRouteName={AppRouteName.Tabs}
      {...props}>
      <Stack.Screen name={AppRouteName.Tabs} component={TabsStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const linking = {
  prefixes: [
    'gh-explorer://',
  ],
  config: {
    screens: {
      [AppRouteName.Tabs]: {
        path: '',
        screens: {
          [AppRouteName.ListGithubUsersScreen]: {
            path: '',
            screens: {
              [AppRouteName.ListGithubUsersScreen]: '',
              [AppRouteName.GithubUserDescriptionScreen]: 'users/:login',
            },
          },
          [AppRouteName.SearchGithubUsersScreen]: {
            path: 'search',
            screens: {
              [AppRouteName.SearchGithubUsersScreen]: '',
              [AppRouteName.GithubUserDescriptionScreen]: 'users/:login',
            },
          },
          [AppRouteName.FavoritesScreen]: {
            path: 'favorites',
            screens: {
              [AppRouteName.FavoritesScreen]: '',
              [AppRouteName.GithubUserDescriptionScreen]: 'users/:login',
            },
          },
        }
      }
    },
  },
};

export function AppNavigationContainer(props: ComponentProps<typeof NavigationContainer>) {
  return (
    <NavigationContainer linking={linking} {...props} />
  )
}
