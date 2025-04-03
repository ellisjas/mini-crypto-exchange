import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, Text } from 'react-native';
import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'relay-runtime';
import IconAccounts from '../../assets/images/Accounts.svg';
import IconHome from '../../assets/images/Home.svg';
import ErrorBoundary from '../components/ErrorBoundaryWithRetry';
import HeaderAccounts from '../components/HeaderAccounts';
import HeaderHome from '../components/HeaderHome';
import Accounts from '../screens/Accounts';
import Home from '../screens/Home';
import type { TabsRootQuery as TabsRootQueryType } from './__generated__/TabsRootQuery.graphql';

type TabName = 'Home' | 'Accounts';

type ScreenOptionsHandler = () => BottomTabNavigationOptions;

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: IconHome,
  Accounts: IconAccounts,
};

const HEADER_COLOR = '#3251ba';

const TabsRootQuery = graphql`
  query TabsRootQuery {
    ...HeaderHomeFragment
    ...HomeFragment
    ...AccountsFragment
  }
`;

export default function Tabs() {
  const data = useLazyLoadQuery<TabsRootQueryType>(TabsRootQuery, {});

  const makeScreenOptions: ScreenOptionsHandler = ({ route }) => {
    const Icon = TAB_ICON[route.name as TabName];

    return {
      tabBarIcon: ({ focused }) => (
        <Icon height={40} style={{ color: focused ? 'black' : '#89898A' }} />
      ),
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: '#89898A',
    };
  };

  const renderHeaderHome = () => <HeaderHome query={data} />;

  const screenOptions = {
    home: {
      headerStyle: {
        backgroundColor: HEADER_COLOR,
        height: Platform.OS === 'ios' ? 150 : 126,
      },
      headerTitle: renderHeaderHome,
      headerShadowVisible: false,
    },
    accounts: {
      headerStyle: { backgroundColor: HEADER_COLOR },
      headerTitle: HeaderAccounts,
      headerShadowVisible: false,
    },
  };

  return (
    <ErrorBoundary fallback={<Text>Something went wrong :(</Text>}>
      <Tab.Navigator initialRouteName="Home" screenOptions={makeScreenOptions}>
        <Tab.Screen options={screenOptions.home} name="Home">
          {() => <Home query={data} />}
        </Tab.Screen>
        <Tab.Screen options={screenOptions.accounts} name="Accounts">
          {() => <Accounts query={data} />}
        </Tab.Screen>
      </Tab.Navigator>
    </ErrorBoundary>
  );
}
