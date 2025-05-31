import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { GithubUserDescriptionScreen } from './screens/GithubUserDescriptionScreen';
import { ListGithubUsersScreen } from './screens/ListGithubUsersScreen';
import { SearchGithubUsersScreen } from './screens/SearchGithubUsersScreen';
import { useTheme } from 'react-native-paper';
import { RouteName } from '@/utils/routes';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabsStack() {
  const theme = useTheme();

  return (
    <Tab.Navigator screenOptions={{
      headerStyle: { backgroundColor: theme.colors.surface },
      headerTintColor: theme.colors.onSurface,
      sceneStyle: { backgroundColor: theme.colors.surface },
    }}>
      <Tab.Screen name={RouteName.ListGithubUsersScreen} component={ListGithubUsersScreen} />
      <Tab.Screen name={RouteName.SearchGithubUsersScreen} component={SearchGithubUsersScreen} />
      <Tab.Screen name={RouteName.FavoritesScreen} component={FavoritesScreen} />
    </Tab.Navigator>
  )
}

export function RootStack() {
  const theme = useTheme();
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: theme.colors.surface },
      headerTintColor: theme.colors.onSurface,
      contentStyle: { backgroundColor: theme.colors.surface },
    }}>
      <Stack.Screen name="(tabs)" component={TabsStack} options={{ headerShown: false }} />
      <Stack.Screen name={RouteName.GithubUserDescriptionScreen} initialParams={{ login: '' }} component={GithubUserDescriptionScreen as never} />
    </Stack.Navigator>
  )
}
