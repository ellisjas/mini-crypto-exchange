import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Suspense } from 'react';
import { RelayEnvironmentProvider } from 'relay-hooks';
import { Text } from 'react-native';
import Tabs from './src/layout/Tabs';
import environment from './src/relay/environment';
import ErrorBoundary from './src/components/ErrorBoundaryWithRetry';

const Root = createStackNavigator();

export default function App() {
  return (
    <ErrorBoundary fallback={<Text>Error</Text>}>
      <Suspense fallback={<Text>Loading...</Text>}>
        <RelayEnvironmentProvider environment={environment}>
          <NavigationContainer>
            <Root.Navigator>
              <Root.Screen
                name="Root"
                component={Tabs}
                options={{ headerShown: false }}
              />
            </Root.Navigator>
          </NavigationContainer>
        </RelayEnvironmentProvider>
      </Suspense>
    </ErrorBoundary>
  );
}
