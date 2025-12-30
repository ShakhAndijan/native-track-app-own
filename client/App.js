// import React from 'react';
// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
// import AccountScreen from './src/screens/AccountScreen';
// import SigninScreen from './src/screens/SigninScreen';
// import SignupScreen from './src/screens/SignupScreen';
// import TrackCreateScreen from './src/screens/TrackCreateScreen';
// import TrackDetailScreen from './src/screens/TrackDetailScreen';
// import TrackListScreen from './src/screens/TrackListScreen';

// const switchNavigator = createSwitchNavigator({
//   loginFlow: createStackNavigator({
//     Signup: SignupScreen,
//     Signin: SigninScreen,
//   }),
//   mainFlow: createMaterialBottomTabNavigator({
//     trackListFlow: createStackNavigator({
//       TrackList: TrackListScreen,
//       TrackDetail: TrackDetailScreen,
//     }),
//     TrackCreate: TrackCreateScreen,
//     Account: AccountScreen,
//   }),
// });

// export default createAppContainer(switchNavigator);

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';

// Stack navigatorlar
const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// Login flow stack
function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
    </Stack.Navigator>
  );
}

// Track list flow stack
function TrackListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TrackList" component={TrackListScreen} />
      <Stack.Screen name="TrackDetail" component={TrackDetailScreen} />
    </Stack.Navigator>
  );
}

// Main flow tabs
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'TrackListFlow') iconName = 'format-list-bulleted';
          if (route.name === 'TrackCreate') iconName = 'plus-box';
          if (route.name === 'Account') iconName = 'account';
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen
        name="TrackListFlow"
        component={TrackListStack}
        options={{ title: 'Tracks' }}
      />
      <Tab.Screen name="TrackCreate" component={TrackCreateScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

// Root navigator (switch navigator o‘rniga shartli stack)
export default function App() {
  const isLoggedIn = false; // Bu yerda authentikatsiya holatini boshqarasiz

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainTabs /> : <LoginStack />}
    </NavigationContainer>
  );
}
