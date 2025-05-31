import { t } from '@/i18n/t';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { GithubUserDescriptionScreen } from './screens/GithubUserDescriptionScreen';
import { ListGithubUsersScreen } from './screens/ListGithubUsersScreen';
import { SearchGithubUsersScreen } from './screens/SearchGithubUsersScreen';

const HomeTabs = createBottomTabNavigator({
  screens: {
    ListGithubUsersScreen: {
      screen: ListGithubUsersScreen,
      options: {
        title: t('ListGithubUsersScreen.tab'),
        tabBarIcon: ({ color, size }) => (
          <Image
            // source={newspaper}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    SearchGithubUsersScreen: {
      screen: SearchGithubUsersScreen,
      options: {
        animation: 'fade',
        transitionSpec: {
          animation: 'timing',
          config: {
            duration: 100,
          }
        }
      }
    },
    FavoritesScreen: {
      screen: FavoritesScreen,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Image
            // source={bell}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screenOptions: ({ theme }) => ({
    headerStyle: { backgroundColor: theme.colors.background },
    headerTintColor: theme.colors.text,
    contentStyle: { backgroundColor: theme.colors.background },
  }),
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    GithubUserDescriptionScreen: {
      screen: GithubUserDescriptionScreen,
      initialParams: { login: '' },
      options: {
        title: ':login',
      }
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
